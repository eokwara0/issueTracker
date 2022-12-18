

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.default = graphQLFetch;

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

const dateRegExp = new RegExp('^\\d\\d\\d\\d-\\d\\d-\\d\\d');

function jsonDateReviver(key, value) {
  if (dateRegExp.test(value)) {
    return new Date(value);
  }

  return value;
}

function graphQLFetch(_x) {
  return _graphQLFetch.apply(this, arguments);
}

function _graphQLFetch() {
  _graphQLFetch = _asyncToGenerator(/* #__PURE__ */_regeneratorRuntime().mark(function _callee(query) {
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
  return _graphQLFetch.apply(this, arguments);
}
