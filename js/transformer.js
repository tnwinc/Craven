// This file was generated by modules-webmake (modules for web) project.
// See: https://github.com/medikoo/modules-webmake

window.transformer = (function (modules) {
	var getModule, getRequire, require;
	getModule = (function (wrap) {
		return function (scope, tree, path, fullpath) {
			var name, dir, exports = {}, module = { exports: exports }, fn, isDir;
			path = path.split('/');
			name = path.pop();
			if (!name) {
				isDir = true;
				name = path.pop();
			}
			if ((name === '.') || (name === '..')) {
				path.push(name);
				name = '';
			}
			while ((dir = path.shift())) {
				if (dir === '..') {
					scope = tree.pop();
				} else if (dir !== '.') {
					tree.push(scope);
					scope = scope[dir];
				}
			}
			if (name) {
				if (!isDir && scope[name + '.js']) {
					name += '.js';
				}
				if (typeof scope[name] === 'object') {
					tree.push(scope);
					scope = scope[name];
					name = 'index.js';
				}
			} else {
				name = 'index.js';
			}
			fn = scope[name];
			if (!fn) {
				throw new Error("Could not find module '" + fullpath + "'");
			}
			scope[name] = wrap(module);
			fn.call(exports, exports, module, getRequire(scope, tree));
			return module.exports;
		};
	}(function (cmodule) {
		return function (ignore, module) {
			module.exports = cmodule.exports;
		};
	}));
	require = function (scope, tree, fullpath) {
		var name, path = fullpath, t = fullpath.charAt(0);
		if (t === '/') {
			path = path.slice(1);
			scope = modules['/'];
			tree = [];
		} else if (t !== '.') {
			name = path.split('/', 1)[0];
			scope = modules[name];
			tree = [];
			path = path.slice(name.length + 1) || scope[':mainpath:'];
		}
		return getModule(scope, tree, path, fullpath);
	};
	getRequire = function (scope, tree) {
		return function (path) {
			return require(scope, [].concat(tree), path);
		};
	};
	return getRequire(modules, []);
})({
	"craven": {
		"transformer": {
			"transformer.js": function (exports, module, require) {
				(function() {
				  var parser, singleQuotedStringPattern, urlRegex;

				  parser = require('parser').parser;

				  singleQuotedStringPattern = /^'(.*)'$/;

				  urlRegex = /(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;

				  exports.transform = function(sql, ravenUrl, database, index) {
				    var filter, filters, params, property, request, statement, _i, _j, _len, _len2, _ref, _ref2, _ref3, _ref4, _ref5;
				    if (!(ravenUrl != null ? ravenUrl.length : void 0)) {
				      throw Error('ravenUrl must be defined');
				    }
				    if (!ravenUrl.match(urlRegex)) throw Error('ravenUrl must be a valid URL');
				    ravenUrl = ravenUrl.replace(/\/+$/, '');
				    database = (database != null ? database.length : void 0) > 0 ? "databases/" + database + "/" : '';
				    if ((index != null ? index.length : void 0) === 0) index = void 0;
				    statement = parser.parse(sql);
				    request = {};
				    if (statement.type === 'SELECT') {
				      request.url = "" + ravenUrl + "/" + database + "indexes/dynamic/" + statement.collection;
				      params = [];
				      if ((_ref = statement.filters) != null ? _ref.length : void 0) {
				        filters = [];
				        _ref2 = statement.filters;
				        for (_i = 0, _len = _ref2.length; _i < _len; _i++) {
				          filter = _ref2[_i];
				          filter.value = ((_ref3 = filter.value) != null ? typeof _ref3.match === "function" ? _ref3.match(singleQuotedStringPattern) : void 0 : void 0) ? filter.value.replace(singleQuotedStringPattern, '"$1"') : filter.value;
				          filters.push("" + filter.key + ":" + filter.value);
				        }
				        params.push("query=" + (filters.join(' AND ')));
				      }
				      if ((_ref4 = statement.properties) != null ? _ref4.length : void 0) {
				        _ref5 = statement.properties;
				        for (_j = 0, _len2 = _ref5.length; _j < _len2; _j++) {
				          property = _ref5[_j];
				          params.push("fetch=" + property);
				        }
				      }
				      if (params.length) request.url += "?" + (params.join('&'));
				    }
				    return request;
				  };

				}).call(this);
			}
		}
	},
	"file": {
		":mainpath:": "fake_modules_for_web_build/file",
		"fake_modules_for_web_build": {
			"file.js": function (exports, module, require) {
				
			}
		}
	},
	"fs": {
		":mainpath:": "fake_modules_for_web_build/fs",
		"fake_modules_for_web_build": {
			"fs.js": function (exports, module, require) {
				
			}
		}
	},
	"parser": {
		":mainpath:": "parser",
		"parser.js": function (exports, module, require) {
			/* Jison generated parser */
			var parser = (function(){
			var parser = {trace: function trace() { },
			yy: {},
			symbols_: {"error":2,"SQLStatement":3,"OPERATION":4,"EOF":5,"CRUDOPERATION":6,"WHERESTATEMENT":7,"SELECT":8,"PROPERTIES":9,"FROM":10,"IDENTIFIER":11,"ALLPROPERTIES":12,"IDENTIFIERLIST":13,",":14,"WHERE":15,"WHERECLAUSELIST":16,"WHERECLAUSE":17,"AND":18,"OP":19,"VALUE":20,"NUMBER":21,"STRING":22,"$accept":0,"$end":1},
			terminals_: {2:"error",5:"EOF",8:"SELECT",10:"FROM",11:"IDENTIFIER",12:"ALLPROPERTIES",14:",",15:"WHERE",18:"AND",19:"OP",21:"NUMBER",22:"STRING"},
			productions_: [0,[3,2],[4,1],[4,2],[6,4],[9,1],[9,1],[13,1],[13,3],[7,2],[16,1],[16,3],[17,3],[20,1],[20,1]],
			performAction: function anonymous(yytext,yyleng,yylineno,yy,yystate,$$,_$) {

			var $0 = $$.length - 1;
			switch (yystate) {
			case 1:return this.$;
			break;
			case 2: this.$ = $$[$0]; 
			break;
			case 3: this.$ = $$[$0-1]; $$[$0-1].filters = $$[$0]; 
			break;
			case 4: this.$ = {type: 'SELECT', properties: $$[$0-2], collection: $$[$0]}; 
			break;
			case 5: this.$ = null; 
			break;
			case 6: this.$ = $$[$0]; 
			break;
			case 7: this.$ = [$$[$0]]; 
			break;
			case 8: this.$ = $$[$0-2]; $$[$0-2].push($$[$0]); 
			break;
			case 9: this.$ = $$[$0]; 
			break;
			case 10: this.$ = [$$[$0]]; 
			break;
			case 11: this.$ = $$[$0-2]; $$[$0-2].push($$[$0]); 
			break;
			case 12: this.$ = {key: $$[$0-2], operator: $$[$0-1], value: $$[$0]}; 
			break;
			case 13: this.$ = $$[$0]; 
			break;
			case 14: this.$ = $$[$0]; 
			break;
			}
			},
			table: [{3:1,4:2,6:3,8:[1,4]},{1:[3]},{5:[1,5]},{5:[2,2],7:6,15:[1,7]},{9:8,11:[1,11],12:[1,9],13:10},{1:[2,1]},{5:[2,3]},{11:[1,14],16:12,17:13},{10:[1,15]},{10:[2,5]},{10:[2,6],14:[1,16]},{10:[2,7],14:[2,7]},{5:[2,9],18:[1,17]},{5:[2,10],18:[2,10]},{19:[1,18]},{11:[1,19]},{11:[1,20]},{11:[1,14],17:21},{20:22,21:[1,23],22:[1,24]},{5:[2,4],15:[2,4]},{10:[2,8],14:[2,8]},{5:[2,11],18:[2,11]},{5:[2,12],18:[2,12]},{5:[2,13],18:[2,13]},{5:[2,14],18:[2,14]}],
			defaultActions: {5:[2,1],6:[2,3],9:[2,5]},
			parseError: function parseError(str, hash) {
			    throw new Error(str);
			},
			parse: function parse(input) {
			    var self = this, stack = [0], vstack = [null], lstack = [], table = this.table, yytext = "", yylineno = 0, yyleng = 0, recovering = 0, TERROR = 2, EOF = 1;
			    this.lexer.setInput(input);
			    this.lexer.yy = this.yy;
			    this.yy.lexer = this.lexer;
			    this.yy.parser = this;
			    if (typeof this.lexer.yylloc == "undefined")
			        this.lexer.yylloc = {};
			    var yyloc = this.lexer.yylloc;
			    lstack.push(yyloc);
			    var ranges = this.lexer.options && this.lexer.options.ranges;
			    if (typeof this.yy.parseError === "function")
			        this.parseError = this.yy.parseError;
			    function popStack(n) {
			        stack.length = stack.length - 2 * n;
			        vstack.length = vstack.length - n;
			        lstack.length = lstack.length - n;
			    }
			    function lex() {
			        var token;
			        token = self.lexer.lex() || 1;
			        if (typeof token !== "number") {
			            token = self.symbols_[token] || token;
			        }
			        return token;
			    }
			    var symbol, preErrorSymbol, state, action, a, r, yyval = {}, p, len, newState, expected;
			    while (true) {
			        state = stack[stack.length - 1];
			        if (this.defaultActions[state]) {
			            action = this.defaultActions[state];
			        } else {
			            if (symbol === null || typeof symbol == "undefined") {
			                symbol = lex();
			            }
			            action = table[state] && table[state][symbol];
			        }
			        if (typeof action === "undefined" || !action.length || !action[0]) {
			            var errStr = "";
			            if (!recovering) {
			                expected = [];
			                for (p in table[state])
			                    if (this.terminals_[p] && p > 2) {
			                        expected.push("'" + this.terminals_[p] + "'");
			                    }
			                if (this.lexer.showPosition) {
			                    errStr = "Parse error on line " + (yylineno + 1) + ":\n" + this.lexer.showPosition() + "\nExpecting " + expected.join(", ") + ", got '" + (this.terminals_[symbol] || symbol) + "'";
			                } else {
			                    errStr = "Parse error on line " + (yylineno + 1) + ": Unexpected " + (symbol == 1?"end of input":"'" + (this.terminals_[symbol] || symbol) + "'");
			                }
			                this.parseError(errStr, {text: this.lexer.match, token: this.terminals_[symbol] || symbol, line: this.lexer.yylineno, loc: yyloc, expected: expected});
			            }
			        }
			        if (action[0] instanceof Array && action.length > 1) {
			            throw new Error("Parse Error: multiple actions possible at state: " + state + ", token: " + symbol);
			        }
			        switch (action[0]) {
			        case 1:
			            stack.push(symbol);
			            vstack.push(this.lexer.yytext);
			            lstack.push(this.lexer.yylloc);
			            stack.push(action[1]);
			            symbol = null;
			            if (!preErrorSymbol) {
			                yyleng = this.lexer.yyleng;
			                yytext = this.lexer.yytext;
			                yylineno = this.lexer.yylineno;
			                yyloc = this.lexer.yylloc;
			                if (recovering > 0)
			                    recovering--;
			            } else {
			                symbol = preErrorSymbol;
			                preErrorSymbol = null;
			            }
			            break;
			        case 2:
			            len = this.productions_[action[1]][1];
			            yyval.$ = vstack[vstack.length - len];
			            yyval._$ = {first_line: lstack[lstack.length - (len || 1)].first_line, last_line: lstack[lstack.length - 1].last_line, first_column: lstack[lstack.length - (len || 1)].first_column, last_column: lstack[lstack.length - 1].last_column};
			            if (ranges) {
			                yyval._$.range = [lstack[lstack.length - (len || 1)].range[0], lstack[lstack.length - 1].range[1]];
			            }
			            r = this.performAction.call(yyval, yytext, yyleng, yylineno, this.yy, action[1], vstack, lstack);
			            if (typeof r !== "undefined") {
			                return r;
			            }
			            if (len) {
			                stack = stack.slice(0, -1 * len * 2);
			                vstack = vstack.slice(0, -1 * len);
			                lstack = lstack.slice(0, -1 * len);
			            }
			            stack.push(this.productions_[action[1]][0]);
			            vstack.push(yyval.$);
			            lstack.push(yyval._$);
			            newState = table[stack[stack.length - 2]][stack[stack.length - 1]];
			            stack.push(newState);
			            break;
			        case 3:
			            return true;
			        }
			    }
			    return true;
			}
			};
			/* Jison generated lexer */
			var lexer = (function(){
			var lexer = ({EOF:1,
			parseError:function parseError(str, hash) {
			        if (this.yy.parser) {
			            this.yy.parser.parseError(str, hash);
			        } else {
			            throw new Error(str);
			        }
			    },
			setInput:function (input) {
			        this._input = input;
			        this._more = this._less = this.done = false;
			        this.yylineno = this.yyleng = 0;
			        this.yytext = this.matched = this.match = '';
			        this.conditionStack = ['INITIAL'];
			        this.yylloc = {first_line:1,first_column:0,last_line:1,last_column:0};
			        if (this.options.ranges) this.yylloc.range = [0,0];
			        this.offset = 0;
			        return this;
			    },
			input:function () {
			        var ch = this._input[0];
			        this.yytext += ch;
			        this.yyleng++;
			        this.offset++;
			        this.match += ch;
			        this.matched += ch;
			        var lines = ch.match(/(?:\r\n?|\n).*/g);
			        if (lines) {
			            this.yylineno++;
			            this.yylloc.last_line++;
			        } else {
			            this.yylloc.last_column++;
			        }
			        if (this.options.ranges) this.yylloc.range[1]++;

			        this._input = this._input.slice(1);
			        return ch;
			    },
			unput:function (ch) {
			        var len = ch.length;
			        var lines = ch.split(/(?:\r\n?|\n)/g);

			        this._input = ch + this._input;
			        this.yytext = this.yytext.substr(0, this.yytext.length-len-1);
			        //this.yyleng -= len;
			        this.offset -= len;
			        var oldLines = this.match.split(/(?:\r\n?|\n)/g);
			        this.match = this.match.substr(0, this.match.length-1);
			        this.matched = this.matched.substr(0, this.matched.length-1);

			        if (lines.length-1) this.yylineno -= lines.length-1;
			        var r = this.yylloc.range;

			        this.yylloc = {first_line: this.yylloc.first_line,
			          last_line: this.yylineno+1,
			          first_column: this.yylloc.first_column,
			          last_column: lines ?
			              (lines.length === oldLines.length ? this.yylloc.first_column : 0) + oldLines[oldLines.length - lines.length].length - lines[0].length:
			              this.yylloc.first_column - len
			          };

			        if (this.options.ranges) {
			            this.yylloc.range = [r[0], r[0] + this.yyleng - len];
			        }
			        return this;
			    },
			more:function () {
			        this._more = true;
			        return this;
			    },
			less:function (n) {
			        this.unput(this.match.slice(n));
			    },
			pastInput:function () {
			        var past = this.matched.substr(0, this.matched.length - this.match.length);
			        return (past.length > 20 ? '...':'') + past.substr(-20).replace(/\n/g, "");
			    },
			upcomingInput:function () {
			        var next = this.match;
			        if (next.length < 20) {
			            next += this._input.substr(0, 20-next.length);
			        }
			        return (next.substr(0,20)+(next.length > 20 ? '...':'')).replace(/\n/g, "");
			    },
			showPosition:function () {
			        var pre = this.pastInput();
			        var c = new Array(pre.length + 1).join("-");
			        return pre + this.upcomingInput() + "\n" + c+"^";
			    },
			next:function () {
			        if (this.done) {
			            return this.EOF;
			        }
			        if (!this._input) this.done = true;

			        var token,
			            match,
			            tempMatch,
			            index,
			            col,
			            lines;
			        if (!this._more) {
			            this.yytext = '';
			            this.match = '';
			        }
			        var rules = this._currentRules();
			        for (var i=0;i < rules.length; i++) {
			            tempMatch = this._input.match(this.rules[rules[i]]);
			            if (tempMatch && (!match || tempMatch[0].length > match[0].length)) {
			                match = tempMatch;
			                index = i;
			                if (!this.options.flex) break;
			            }
			        }
			        if (match) {
			            lines = match[0].match(/(?:\r\n?|\n).*/g);
			            if (lines) this.yylineno += lines.length;
			            this.yylloc = {first_line: this.yylloc.last_line,
			                           last_line: this.yylineno+1,
			                           first_column: this.yylloc.last_column,
			                           last_column: lines ? lines[lines.length-1].length-lines[lines.length-1].match(/\r?\n?/)[0].length : this.yylloc.last_column + match[0].length};
			            this.yytext += match[0];
			            this.match += match[0];
			            this.matches = match;
			            this.yyleng = this.yytext.length;
			            if (this.options.ranges) {
			                this.yylloc.range = [this.offset, this.offset += this.yyleng];
			            }
			            this._more = false;
			            this._input = this._input.slice(match[0].length);
			            this.matched += match[0];
			            token = this.performAction.call(this, this.yy, this, rules[index],this.conditionStack[this.conditionStack.length-1]);
			            if (this.done && this._input) this.done = false;
			            if (token) return token;
			            else return;
			        }
			        if (this._input === "") {
			            return this.EOF;
			        } else {
			            return this.parseError('Lexical error on line '+(this.yylineno+1)+'. Unrecognized text.\n'+this.showPosition(),
			                    {text: "", token: null, line: this.yylineno});
			        }
			    },
			lex:function lex() {
			        var r = this.next();
			        if (typeof r !== 'undefined') {
			            return r;
			        } else {
			            return this.lex();
			        }
			    },
			begin:function begin(condition) {
			        this.conditionStack.push(condition);
			    },
			popState:function popState() {
			        return this.conditionStack.pop();
			    },
			_currentRules:function _currentRules() {
			        return this.conditions[this.conditionStack[this.conditionStack.length-1]].rules;
			    },
			topState:function () {
			        return this.conditionStack[this.conditionStack.length-2];
			    },
			pushState:function begin(condition) {
			        this.begin(condition);
			    }});
			lexer.options = {};
			lexer.performAction = function anonymous(yy,yy_,$avoiding_name_collisions,YY_START) {

			var YYSTATE=YY_START
			switch($avoiding_name_collisions) {
			case 0:/* skip whitespace */
			break;
			case 1:return 8
			break;
			case 2:return 15
			break;
			case 3:return 10
			break;
			case 4:return 18
			break;
			case 5:return 12
			break;
			case 6:return 14
			break;
			case 7:return 11
			break;
			case 8:return 21
			break;
			case 9:return 22
			break;
			case 10:return 22
			break;
			case 11:return 19
			break;
			case 12:return 5
			break;
			}
			};
			lexer.rules = [/^(?:\s+)/,/^(?:[Ss][Ee][Ll][Ee][Cc][Tt])/,/^(?:[Ww][Hh][Ee][Rr][Ee])/,/^(?:[Ff][Rr][Oo][Mm])/,/^(?:[Aa][Nn][Dd])/,/^(?:\*)/,/^(?:,)/,/^(?:[a-zA-Z_-]+)/,/^(?:\d+)/,/^(?:['].*?['])/,/^(?:["].*?["])/,/^(?:[><=])/,/^(?:$)/];
			lexer.conditions = {"INITIAL":{"rules":[0,1,2,3,4,5,6,7,8,9,10,11,12],"inclusive":true}};
			return lexer;})()
			parser.lexer = lexer;
			function Parser () { this.yy = {}; }Parser.prototype = parser;parser.Parser = Parser;
			return new Parser;
			})();
			if (typeof require !== 'undefined' && typeof exports !== 'undefined') {
			exports.parser = parser;
			exports.Parser = parser.Parser;
			exports.parse = function () { return parser.parse.apply(parser, arguments); }
			exports.main = function commonjsMain(args) {
			    if (!args[1])
			        throw new Error('Usage: '+args[0]+' FILE');
			    var source, cwd;
			    if (typeof process !== 'undefined') {
			        source = require('fs').readFileSync(require('path').resolve(args[1]), "utf8");
			    } else {
			        source = require("file").path(require("file").cwd()).join(args[1]).read({charset: "utf-8"});
			    }
			    return exports.parser.parse(source);
			}
			if (typeof module !== 'undefined' && require.main === module) {
			  exports.main(typeof process !== 'undefined' ? process.argv.slice(1) : require("system").args);
			}
			}
		}
	},
	"path": {
		":mainpath:": "fake_modules_for_web_build/path",
		"fake_modules_for_web_build": {
			"path.js": function (exports, module, require) {
				
			}
		}
	},
	"system": {
		":mainpath:": "fake_modules_for_web_build/system",
		"fake_modules_for_web_build": {
			"system.js": function (exports, module, require) {
				
			}
		}
	}
})("craven/transformer/transformer");