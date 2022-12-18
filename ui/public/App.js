

function _typeof(obj) {
  '@babel/helpers - typeof';

  return _typeof = typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol' ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === 'function' && obj.constructor === Symbol && obj !== Symbol.prototype ? 'symbol' : typeof obj; }, _typeof(obj);
}

function _regeneratorRuntime() {
  /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}; const Op = Object.prototype; const hasOwn = Op.hasOwnProperty; const $Symbol = typeof Symbol === 'function' ? Symbol : {}; const iteratorSymbol = $Symbol.iterator || '@@iterator'; const asyncIteratorSymbol = $Symbol.asyncIterator || '@@asyncIterator'; const
    toStringTagSymbol = $Symbol.toStringTag || '@@toStringTag'; function define(obj, key, value) {
    return Object.defineProperty(obj, key, {
      value, enumerable: !0, configurable: !0, writable: !0,
    }), obj[key];
  } try { define({}, ''); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) {
    const protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator; const generator = Object.create(protoGenerator.prototype); const
      context = new Context(tryLocsList || []); return generator._invoke = (function (innerFn, self, context) { let state = 'suspendedStart'; return function (method, arg) { if (state === 'executing') throw new Error('Generator is already running'); if (state === 'completed') { if (method === 'throw') throw arg; return doneResult(); } for (context.method = method, context.arg = arg; ;) { const { delegate } = context; if (delegate) { const delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if (context.method === 'next') context.sent = context._sent = context.arg; else if (context.method === 'throw') { if (state === 'suspendedStart') throw state = 'completed', context.arg; context.dispatchException(context.arg); } else context.method === 'return' && context.abrupt('return', context.arg); state = 'executing'; const record = tryCatch(innerFn, self, context); if (record.type === 'normal') { if (state = context.done ? 'completed' : 'suspendedYield', record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } record.type === 'throw' && (state = 'completed', context.method = 'throw', context.arg = record.arg); } }; }(innerFn, self, context)), generator;
  } function tryCatch(fn, obj, arg) { try { return { type: 'normal', arg: fn.call(obj, arg) }; } catch (err) { return { type: 'throw', arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} let IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); const getProto = Object.getPrototypeOf; const
    NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); const Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ['next', 'throw', 'return'].forEach((method) => { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) {
    function invoke(method, arg, resolve, reject) {
      const record = tryCatch(generator[method], generator, arg); if (record.type !== 'throw') {
        const result = record.arg; const
          { value } = result; return value && _typeof(value) == 'object' && hasOwn.call(value, '__await') ? PromiseImpl.resolve(value.__await).then((value) => { invoke('next', value, resolve, reject); }, (err) => { invoke('throw', err, resolve, reject); }) : PromiseImpl.resolve(value).then((unwrapped) => { result.value = unwrapped, resolve(result); }, error => invoke('throw', error, resolve, reject));
      } reject(record.arg);
    } let previousPromise; this._invoke = function (method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(((resolve, reject) => { invoke(method, arg, resolve, reject); })); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); };
  } function maybeInvokeDelegate(delegate, context) { const method = delegate.iterator[context.method]; if (undefined === method) { if (context.delegate = null, context.method === 'throw') { if (delegate.iterator.return && (context.method = 'return', context.arg = undefined, maybeInvokeDelegate(delegate, context), context.method === 'throw')) return ContinueSentinel; context.method = 'throw', context.arg = new TypeError("The iterator does not provide a 'throw' method"); } return ContinueSentinel; } const record = tryCatch(method, delegate.iterator, context.arg); if (record.type === 'throw') return context.method = 'throw', context.arg = record.arg, context.delegate = null, ContinueSentinel; const info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, context.method !== 'return' && (context.method = 'next', context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = 'throw', context.arg = new TypeError('iterator result is not an object'), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { const entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { const record = entry.completion || {}; record.type = 'normal', delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: 'root' }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) {
    if (iterable) {
      const iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if (typeof iterable.next === 'function') return iterable; if (!isNaN(iterable.length)) {
        let i = -1; const
          next = function next() { for (; ++i < iterable.length;) { if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; } return next.value = undefined, next.done = !0, next; }; return next.next = next;
      }
    } return { next: doneResult };
  } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, define(Gp, 'constructor', GeneratorFunctionPrototype), define(GeneratorFunctionPrototype, 'constructor', GeneratorFunction), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, 'GeneratorFunction'), exports.isGeneratorFunction = function (genFun) { const ctor = typeof genFun === 'function' && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || (ctor.displayName || ctor.name) === 'GeneratorFunction'); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, 'GeneratorFunction')), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); const iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(result => (result.done ? result.value : iter.next())); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, 'Generator'), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, 'toString', () => '[object Generator]'), exports.keys = function (object) { const keys = []; for (const key in object) { keys.push(key); } return keys.reverse(), function next() { for (; keys.length;) { const key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = {
    constructor: Context,
    reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = 'next', this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (const name in this) { name.charAt(0) === 't' && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); } },
    stop: function stop() { this.done = !0; const rootRecord = this.tryEntries[0].completion; if (rootRecord.type === 'throw') throw rootRecord.arg; return this.rval; },
    dispatchException: function dispatchException(exception) {
      if (this.done) throw exception; const context = this; function handle(loc, caught) { return record.type = 'throw', record.arg = exception, context.next = loc, caught && (context.method = 'next', context.arg = undefined), !!caught; } for (let i = this.tryEntries.length - 1; i >= 0; --i) {
        const entry = this.tryEntries[i]; var
          record = entry.completion; if (entry.tryLoc === 'root') return handle('end'); if (entry.tryLoc <= this.prev) {
          const hasCatch = hasOwn.call(entry, 'catchLoc'); const
            hasFinally = hasOwn.call(entry, 'finallyLoc'); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error('try statement without catch or finally'); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); }
        }
      }
    },
    abrupt: function abrupt(type, arg) { for (let i = this.tryEntries.length - 1; i >= 0; --i) { const entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, 'finallyLoc') && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && (type === 'break' || type === 'continue') && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); const record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = 'next', this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); },
    complete: function complete(record, afterLoc) { if (record.type === 'throw') throw record.arg; return record.type === 'break' || record.type === 'continue' ? this.next = record.arg : record.type === 'return' ? (this.rval = this.arg = record.arg, this.method = 'return', this.next = 'end') : record.type === 'normal' && afterLoc && (this.next = afterLoc), ContinueSentinel; },
    finish: function finish(finallyLoc) { for (let i = this.tryEntries.length - 1; i >= 0; --i) { const entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } },
    catch: function _catch(tryLoc) { for (let i = this.tryEntries.length - 1; i >= 0; --i) { const entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { const record = entry.completion; if (record.type === 'throw') { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error('illegal catch attempt'); },
    delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName, nextLoc }, this.method === 'next' && (this.arg = undefined), ContinueSentinel; },
  }, exports;
}

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var { value } = info; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) {
  return function () {
    const self = this; const
      args = arguments; return new Promise(((resolve, reject) => { const gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, 'next', value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, 'throw', err); } _next(undefined); }));
  };
}

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _defineProperties(target, props) { for (let i = 0; i < props.length; i++) { const descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, 'prototype', { writable: false }); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function'); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, 'prototype', { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) {
  const hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() {
    const Super = _getPrototypeOf(Derived); let
      result; if (hasNativeReflectConstruct) { const NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result);
  };
}

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === 'object' || typeof call === 'function')) { return call; } if (call !== void 0) { throw new TypeError('Derived constructors may only return object or undefined'); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === 'undefined' || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === 'function') return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], () => {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

const IssueFilter = /* #__PURE__ */(function (_React$Component) {
  _inherits(IssueFilter, _React$Component);

  const _super = _createSuper(IssueFilter);

  function IssueFilter() {
    _classCallCheck(this, IssueFilter);

    return _super.apply(this, arguments);
  }

  _createClass(IssueFilter, [{
    key: 'render',
    value: function render() {
      return /* #__PURE__ */React.createElement('div', null, ' This why is a placeholder for the issue filter.');
    },
  }]);

  return IssueFilter;
}(React.Component));

function IssueTable(props) {
  return /* #__PURE__ */React.createElement('table', {
    style: {
      borderCollapse: 'collapse',
    },
  }, /* #__PURE__ */React.createElement('thead', null, /* #__PURE__ */React.createElement('tr', null, /* #__PURE__ */React.createElement('th', null, 'ID'), /* #__PURE__ */React.createElement('th', null, 'Status'), /* #__PURE__ */React.createElement('th', null, 'Owner'), /* #__PURE__ */React.createElement('th', null, 'Created'), /* #__PURE__ */React.createElement('th', null, 'Effort'), /* #__PURE__ */React.createElement('th', null, 'Due Date'), /* #__PURE__ */React.createElement('th', null, 'Title'))), /* #__PURE__ */React.createElement('tbody', null, props.issues.map(issue =>
  /* #__PURE__ */React.createElement(IssueRow, {
      key: issue.id,
      issue,
    }))));
}

const IssueAdd = /* #__PURE__ */(function (_React$Component2) {
  _inherits(IssueAdd, _React$Component2);

  const _super2 = _createSuper(IssueAdd);

  function IssueAdd() {
    let _this;

    _classCallCheck(this, IssueAdd);

    _this = _super2.call(this);
    _this.handleSubmit = _this.handleSubmit.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(IssueAdd, [{
    key: 'handleSubmit',
    value: function handleSubmit(e) {
      e.preventDefault();
      const form = document.forms.issueAdd;
      const issue = {
        owner: form.owner.value,
        title: form.title.value,
        due: new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * 10),
      };
      this.props.createIssue(issue);
      form.owner.value = '';
      form.title.value = '';
    },
  }, {
    key: 'render',
    value: function render() {
      return /* #__PURE__ */React.createElement('form', {
        name: 'issueAdd',
        onSubmit: this.handleSubmit,
      }, /* #__PURE__ */React.createElement('input', {
        className: 'owner',
        type: 'text',
        name: 'owner',
        placeholder: 'Owner',
      }), /* #__PURE__ */React.createElement('input', {
        className: 'title',
        type: 'text',
        name: 'title',
        placeholder: 'Title',
      }), /* #__PURE__ */React.createElement('button', null, 'Report'));
    },
  }]);

  return IssueAdd;
}(React.Component));

function IssueRow(props) {
  const { issue } = props;
  return /* #__PURE__ */React.createElement('tr', null, /* #__PURE__ */React.createElement('td', null, issue.id), /* #__PURE__ */React.createElement('td', null, issue.status), /* #__PURE__ */React.createElement('td', null, issue.owner), /* #__PURE__ */React.createElement('td', null, issue.created.toDateString()), /* #__PURE__ */React.createElement('td', null, issue.effort), /* #__PURE__ */React.createElement('td', null, issue.due ? issue.due.toDateString() : ''), /* #__PURE__ */React.createElement('td', null, issue.title));
} // Passing Data Using Children


const dateRegExp = new RegExp('^\\d\\d\\d\\d-\\d\\d-\\d\\d');

function jsonDateReviver(key, value) {
  if (dateRegExp.test(value)) {
    return new Date(value);
  }

  return value;
}

const IssueList = /* #__PURE__ */(function (_React$Component3) {
  _inherits(IssueList, _React$Component3);

  const _super3 = _createSuper(IssueList);

  function IssueList() {
    let _this2;

    _classCallCheck(this, IssueList);

    _this2 = _super3.call(this);
    _this2.state = {
      issues: [],
    };
    _this2.createIssue = _this2.createIssue.bind(_assertThisInitialized(_this2));
    return _this2;
  }

  _createClass(IssueList, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.loadData();
    },
  }, {
    key: 'graphQLFetch',
    value: (function () {
      const _graphQLFetch = _asyncToGenerator(/* #__PURE__ */_regeneratorRuntime().mark(function _callee(query) {
        let variables;
        let response;
        let body;
        let result;
        let error;
        let details;
        const _args = arguments;
        return _regeneratorRuntime().wrap((_context) => {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                variables = _args.length > 1 && _args[1] !== undefined ? _args[1] : {};
                _context.prev = 1;
                _context.next = 4;
                return fetch(window.ENV.UI_API_ENDPOINT, {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                    query,
                    variables,
                  }),
                });

              case 4:
                response = _context.sent;
                _context.next = 7;
                return response.text();

              case 7:
                body = _context.sent;
                result = JSON.parse(body, jsonDateReviver);

                if (result.errors) {
                  error = result.errors[0];

                  if (error.extensions.code == 'BAD_USER_INPUT') {
                    details = error.extensions.exception.errors.join('\n');
                    alert(''.concat(error.message, ':\n').concat(details));
                  } else {
                    alert(''.concat(error.extensinos.code, ':').concat(error.message));
                  }
                }

                return _context.abrupt('return', result.data);

              case 13:
                _context.prev = 13;
                _context.t0 = _context.catch(1);
                alert('Error in sending data to server: '.concat(_context.t0.message));

              case 16:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, null, [[1, 13]]);
      }));

      function graphQLFetch(_x) {
        return _graphQLFetch.apply(this, arguments);
      }

      return graphQLFetch;
    }()),
  }, {
    key: 'loadData',
    value: (function () {
      const _loadData = _asyncToGenerator(/* #__PURE__ */_regeneratorRuntime().mark(function _callee2() {
        let query; let
          data;
        return _regeneratorRuntime().wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                query = 'query{\n            issueList{\n                id title status owner\n                created effort due\n            }\n        }';
                _context2.next = 3;
                return this.graphQLFetch(query);

              case 3:
                data = _context2.sent;

                if (data) {
                  this.setState({
                    issues: data.issueList,
                  });
                }

              case 5:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function loadData() {
        return _loadData.apply(this, arguments);
      }

      return loadData;
    }()),
  }, {
    key: 'createIssue',
    value: (function () {
      const _createIssue = _asyncToGenerator(/* #__PURE__ */_regeneratorRuntime().mark(function _callee3(issue) {
        let query; let
          data;
        return _regeneratorRuntime().wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                query = 'mutation issueAdd($issue:IssueInputs!){\n            issueAdd(issue: $issue){\n                id\n            }\n        }';
                _context3.next = 3;
                return this.graphQLFetch(query, {
                  issue,
                });

              case 3:
                data = _context3.sent;

                if (data) {
                  this.loadData();
                }

              case 5:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function createIssue(_x2) {
        return _createIssue.apply(this, arguments);
      }

      return createIssue;
    }()),
  }, {
    key: 'render',
    value: function render() {
      return /* #__PURE__ */React.createElement(React.Fragment, null, /* #__PURE__ */React.createElement('h1', null, 'Issue Tracker'), /* #__PURE__ */React.createElement(IssueFilter, null), /* #__PURE__ */React.createElement('hr', null), /* #__PURE__ */React.createElement(IssueTable, {
        issues: this.state.issues,
      }), /* #__PURE__ */React.createElement('hr', null), /* #__PURE__ */React.createElement(IssueAdd, {
        createIssue: this.createIssue,
      }));
    },
  }]);

  return IssueList;
}(React.Component));

const element = /* #__PURE__ */React.createElement(IssueList, null);
const root = ReactDOM.createRoot(document.getElementById('content'));
root.render(element);
