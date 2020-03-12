const options = require("./config");
const fs = require("fs");
const parser = require("@babel/parser");
const traverse = require("@babel/traverse").default;
const { transformFromAst } = require("@babel/core");
const path = require("path");

const Parser = {
  getAst: (path) => {
    const content = fs.readFileSync(path, "utf-8");
    return parser.parse(content, {
      sourceType: "module"
    })
  },
  getDeps: (ast, filename) => {
    const deps = {};
    traverse(ast, {
      ImportDeclaration({ node }) {
        const dirname = path.dirname(filename);
        const filepath = './' + path.join(dirname, node.source.value);
        deps[node.source.value] = filepath;
      }
    });
    return deps;
  },
  getCode: (ast) => {
    const { code } = transformFromAst(ast, null, {
      presets: ['@babel/preset-env']
    });
    return code;
  }
}

class Compiler {
  constructor(options) {
    const { entry, output } = options;
    this.entry = entry;
    this.output = output;
    this.modules = [];
  }

  run() {
    const info = this.build(this.entry);
    this.modules.push(info);

    let i = 0;

    const loop = (info) => {
      const { deps } = info;
      if (deps && Object.keys(deps).length) {
        const keys = Object.keys(deps);
        for (let key of keys) {
          this.modules.push(this.build(deps[key]));
        }
      }
      i = i + 1;
      const next = this.modules[i];
      if (next) {
        loop(next);
      }
      return;
    }

    loop(this.modules[i]);

    const depsGraph = this.modules.reduce((graph, info) => {
      return {
        ...graph,
        [info.filename]: {
          deps: info.deps,
          code: info.code
        }
      }
    }, {});

    this.generate(depsGraph);
  }

  build(filename) {
    const { getAst, getDeps, getCode } = Parser;
    const ast = getAst(filename);
    const deps = getDeps(ast, filename);
    const code = getCode(ast);
    return {
      filename,
      code,
      deps
    }
  }

  generate(depsGraph) {
    const filePath = path.join(this.output.path, this.output.filename);

    const bundle = `(function(graph){
      function require(module) {
        var exports = {};
        function localRequire(relativePath) {
          return require(graph[module].deps[relativePath]);
        }
        (function(require, exports, code) {
          eval(code);
        })(localRequire, exports, graph[module].code);
        return exports;
      }
      require('${this.entry}');
    })(${JSON.stringify(depsGraph)})`;

    fs.writeFileSync(filePath, bundle, 'utf-8');
  }
}

new Compiler(options).run();