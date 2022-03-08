
(function(l, r) { if (!l || l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (self.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(self.document);
var app = (function () {
    'use strict';

    function noop() { }
    function add_location(element, file, line, column, char) {
        element.__svelte_meta = {
            loc: { file, line, column, char }
        };
    }
    function run(fn) {
        return fn();
    }
    function blank_object() {
        return Object.create(null);
    }
    function run_all(fns) {
        fns.forEach(run);
    }
    function is_function(thing) {
        return typeof thing === 'function';
    }
    function safe_not_equal(a, b) {
        return a != a ? b == b : a !== b || ((a && typeof a === 'object') || typeof a === 'function');
    }
    let src_url_equal_anchor;
    function src_url_equal(element_src, url) {
        if (!src_url_equal_anchor) {
            src_url_equal_anchor = document.createElement('a');
        }
        src_url_equal_anchor.href = url;
        return element_src === src_url_equal_anchor.href;
    }
    function is_empty(obj) {
        return Object.keys(obj).length === 0;
    }
    function null_to_empty(value) {
        return value == null ? '' : value;
    }
    function append(target, node) {
        target.appendChild(node);
    }
    function insert(target, node, anchor) {
        target.insertBefore(node, anchor || null);
    }
    function detach(node) {
        node.parentNode.removeChild(node);
    }
    function destroy_each(iterations, detaching) {
        for (let i = 0; i < iterations.length; i += 1) {
            if (iterations[i])
                iterations[i].d(detaching);
        }
    }
    function element(name) {
        return document.createElement(name);
    }
    function text(data) {
        return document.createTextNode(data);
    }
    function space() {
        return text(' ');
    }
    function empty() {
        return text('');
    }
    function listen(node, event, handler, options) {
        node.addEventListener(event, handler, options);
        return () => node.removeEventListener(event, handler, options);
    }
    function attr(node, attribute, value) {
        if (value == null)
            node.removeAttribute(attribute);
        else if (node.getAttribute(attribute) !== value)
            node.setAttribute(attribute, value);
    }
    function children(element) {
        return Array.from(element.childNodes);
    }
    function set_input_value(input, value) {
        input.value = value == null ? '' : value;
    }
    function toggle_class(element, name, toggle) {
        element.classList[toggle ? 'add' : 'remove'](name);
    }
    function custom_event(type, detail, bubbles = false) {
        const e = document.createEvent('CustomEvent');
        e.initCustomEvent(type, bubbles, false, detail);
        return e;
    }

    let current_component;
    function set_current_component(component) {
        current_component = component;
    }

    const dirty_components = [];
    const binding_callbacks = [];
    const render_callbacks = [];
    const flush_callbacks = [];
    const resolved_promise = Promise.resolve();
    let update_scheduled = false;
    function schedule_update() {
        if (!update_scheduled) {
            update_scheduled = true;
            resolved_promise.then(flush);
        }
    }
    function add_render_callback(fn) {
        render_callbacks.push(fn);
    }
    // flush() calls callbacks in this order:
    // 1. All beforeUpdate callbacks, in order: parents before children
    // 2. All bind:this callbacks, in reverse order: children before parents.
    // 3. All afterUpdate callbacks, in order: parents before children. EXCEPT
    //    for afterUpdates called during the initial onMount, which are called in
    //    reverse order: children before parents.
    // Since callbacks might update component values, which could trigger another
    // call to flush(), the following steps guard against this:
    // 1. During beforeUpdate, any updated components will be added to the
    //    dirty_components array and will cause a reentrant call to flush(). Because
    //    the flush index is kept outside the function, the reentrant call will pick
    //    up where the earlier call left off and go through all dirty components. The
    //    current_component value is saved and restored so that the reentrant call will
    //    not interfere with the "parent" flush() call.
    // 2. bind:this callbacks cannot trigger new flush() calls.
    // 3. During afterUpdate, any updated components will NOT have their afterUpdate
    //    callback called a second time; the seen_callbacks set, outside the flush()
    //    function, guarantees this behavior.
    const seen_callbacks = new Set();
    let flushidx = 0; // Do *not* move this inside the flush() function
    function flush() {
        const saved_component = current_component;
        do {
            // first, call beforeUpdate functions
            // and update components
            while (flushidx < dirty_components.length) {
                const component = dirty_components[flushidx];
                flushidx++;
                set_current_component(component);
                update(component.$$);
            }
            set_current_component(null);
            dirty_components.length = 0;
            flushidx = 0;
            while (binding_callbacks.length)
                binding_callbacks.pop()();
            // then, once components are updated, call
            // afterUpdate functions. This may cause
            // subsequent updates...
            for (let i = 0; i < render_callbacks.length; i += 1) {
                const callback = render_callbacks[i];
                if (!seen_callbacks.has(callback)) {
                    // ...so guard against infinite loops
                    seen_callbacks.add(callback);
                    callback();
                }
            }
            render_callbacks.length = 0;
        } while (dirty_components.length);
        while (flush_callbacks.length) {
            flush_callbacks.pop()();
        }
        update_scheduled = false;
        seen_callbacks.clear();
        set_current_component(saved_component);
    }
    function update($$) {
        if ($$.fragment !== null) {
            $$.update();
            run_all($$.before_update);
            const dirty = $$.dirty;
            $$.dirty = [-1];
            $$.fragment && $$.fragment.p($$.ctx, dirty);
            $$.after_update.forEach(add_render_callback);
        }
    }
    const outroing = new Set();
    let outros;
    function transition_in(block, local) {
        if (block && block.i) {
            outroing.delete(block);
            block.i(local);
        }
    }
    function transition_out(block, local, detach, callback) {
        if (block && block.o) {
            if (outroing.has(block))
                return;
            outroing.add(block);
            outros.c.push(() => {
                outroing.delete(block);
                if (callback) {
                    if (detach)
                        block.d(1);
                    callback();
                }
            });
            block.o(local);
        }
    }
    function create_component(block) {
        block && block.c();
    }
    function mount_component(component, target, anchor, customElement) {
        const { fragment, on_mount, on_destroy, after_update } = component.$$;
        fragment && fragment.m(target, anchor);
        if (!customElement) {
            // onMount happens before the initial afterUpdate
            add_render_callback(() => {
                const new_on_destroy = on_mount.map(run).filter(is_function);
                if (on_destroy) {
                    on_destroy.push(...new_on_destroy);
                }
                else {
                    // Edge case - component was destroyed immediately,
                    // most likely as a result of a binding initialising
                    run_all(new_on_destroy);
                }
                component.$$.on_mount = [];
            });
        }
        after_update.forEach(add_render_callback);
    }
    function destroy_component(component, detaching) {
        const $$ = component.$$;
        if ($$.fragment !== null) {
            run_all($$.on_destroy);
            $$.fragment && $$.fragment.d(detaching);
            // TODO null out other refs, including component.$$ (but need to
            // preserve final state?)
            $$.on_destroy = $$.fragment = null;
            $$.ctx = [];
        }
    }
    function make_dirty(component, i) {
        if (component.$$.dirty[0] === -1) {
            dirty_components.push(component);
            schedule_update();
            component.$$.dirty.fill(0);
        }
        component.$$.dirty[(i / 31) | 0] |= (1 << (i % 31));
    }
    function init(component, options, instance, create_fragment, not_equal, props, append_styles, dirty = [-1]) {
        const parent_component = current_component;
        set_current_component(component);
        const $$ = component.$$ = {
            fragment: null,
            ctx: null,
            // state
            props,
            update: noop,
            not_equal,
            bound: blank_object(),
            // lifecycle
            on_mount: [],
            on_destroy: [],
            on_disconnect: [],
            before_update: [],
            after_update: [],
            context: new Map(options.context || (parent_component ? parent_component.$$.context : [])),
            // everything else
            callbacks: blank_object(),
            dirty,
            skip_bound: false,
            root: options.target || parent_component.$$.root
        };
        append_styles && append_styles($$.root);
        let ready = false;
        $$.ctx = instance
            ? instance(component, options.props || {}, (i, ret, ...rest) => {
                const value = rest.length ? rest[0] : ret;
                if ($$.ctx && not_equal($$.ctx[i], $$.ctx[i] = value)) {
                    if (!$$.skip_bound && $$.bound[i])
                        $$.bound[i](value);
                    if (ready)
                        make_dirty(component, i);
                }
                return ret;
            })
            : [];
        $$.update();
        ready = true;
        run_all($$.before_update);
        // `false` as a special case of no DOM component
        $$.fragment = create_fragment ? create_fragment($$.ctx) : false;
        if (options.target) {
            if (options.hydrate) {
                const nodes = children(options.target);
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.l(nodes);
                nodes.forEach(detach);
            }
            else {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.c();
            }
            if (options.intro)
                transition_in(component.$$.fragment);
            mount_component(component, options.target, options.anchor, options.customElement);
            flush();
        }
        set_current_component(parent_component);
    }
    /**
     * Base class for Svelte components. Used when dev=false.
     */
    class SvelteComponent {
        $destroy() {
            destroy_component(this, 1);
            this.$destroy = noop;
        }
        $on(type, callback) {
            const callbacks = (this.$$.callbacks[type] || (this.$$.callbacks[type] = []));
            callbacks.push(callback);
            return () => {
                const index = callbacks.indexOf(callback);
                if (index !== -1)
                    callbacks.splice(index, 1);
            };
        }
        $set($$props) {
            if (this.$$set && !is_empty($$props)) {
                this.$$.skip_bound = true;
                this.$$set($$props);
                this.$$.skip_bound = false;
            }
        }
    }

    function dispatch_dev(type, detail) {
        document.dispatchEvent(custom_event(type, Object.assign({ version: '3.46.4' }, detail), true));
    }
    function append_dev(target, node) {
        dispatch_dev('SvelteDOMInsert', { target, node });
        append(target, node);
    }
    function insert_dev(target, node, anchor) {
        dispatch_dev('SvelteDOMInsert', { target, node, anchor });
        insert(target, node, anchor);
    }
    function detach_dev(node) {
        dispatch_dev('SvelteDOMRemove', { node });
        detach(node);
    }
    function listen_dev(node, event, handler, options, has_prevent_default, has_stop_propagation) {
        const modifiers = options === true ? ['capture'] : options ? Array.from(Object.keys(options)) : [];
        if (has_prevent_default)
            modifiers.push('preventDefault');
        if (has_stop_propagation)
            modifiers.push('stopPropagation');
        dispatch_dev('SvelteDOMAddEventListener', { node, event, handler, modifiers });
        const dispose = listen(node, event, handler, options);
        return () => {
            dispatch_dev('SvelteDOMRemoveEventListener', { node, event, handler, modifiers });
            dispose();
        };
    }
    function attr_dev(node, attribute, value) {
        attr(node, attribute, value);
        if (value == null)
            dispatch_dev('SvelteDOMRemoveAttribute', { node, attribute });
        else
            dispatch_dev('SvelteDOMSetAttribute', { node, attribute, value });
    }
    function set_data_dev(text, data) {
        data = '' + data;
        if (text.wholeText === data)
            return;
        dispatch_dev('SvelteDOMSetData', { node: text, data });
        text.data = data;
    }
    function validate_each_argument(arg) {
        if (typeof arg !== 'string' && !(arg && typeof arg === 'object' && 'length' in arg)) {
            let msg = '{#each} only iterates over array-like objects.';
            if (typeof Symbol === 'function' && arg && Symbol.iterator in arg) {
                msg += ' You can use a spread to convert this iterable into an array.';
            }
            throw new Error(msg);
        }
    }
    function validate_slots(name, slot, keys) {
        for (const slot_key of Object.keys(slot)) {
            if (!~keys.indexOf(slot_key)) {
                console.warn(`<${name}> received an unexpected slot "${slot_key}".`);
            }
        }
    }
    /**
     * Base class for Svelte components with some minor dev-enhancements. Used when dev=true.
     */
    class SvelteComponentDev extends SvelteComponent {
        constructor(options) {
            if (!options || (!options.target && !options.$$inline)) {
                throw new Error("'target' is a required option");
            }
            super();
        }
        $destroy() {
            super.$destroy();
            this.$destroy = () => {
                console.warn('Component was already destroyed'); // eslint-disable-line no-console
            };
        }
        $capture_state() { }
        $inject_state() { }
    }

    const subscriber_queue = [];
    /**
     * Create a `Writable` store that allows both updating and reading by subscription.
     * @param {*=}value initial value
     * @param {StartStopNotifier=}start start and stop notifications for subscriptions
     */
    function writable(value, start = noop) {
        let stop;
        const subscribers = new Set();
        function set(new_value) {
            if (safe_not_equal(value, new_value)) {
                value = new_value;
                if (stop) { // store is ready
                    const run_queue = !subscriber_queue.length;
                    for (const subscriber of subscribers) {
                        subscriber[1]();
                        subscriber_queue.push(subscriber, value);
                    }
                    if (run_queue) {
                        for (let i = 0; i < subscriber_queue.length; i += 2) {
                            subscriber_queue[i][0](subscriber_queue[i + 1]);
                        }
                        subscriber_queue.length = 0;
                    }
                }
            }
        }
        function update(fn) {
            set(fn(value));
        }
        function subscribe(run, invalidate = noop) {
            const subscriber = [run, invalidate];
            subscribers.add(subscriber);
            if (subscribers.size === 1) {
                stop = start(set) || noop;
            }
            run(value);
            return () => {
                subscribers.delete(subscriber);
                if (subscribers.size === 0) {
                    stop();
                    stop = null;
                }
            };
        }
        return { set, update, subscribe };
    }

    const currentInstance = writable('[No Instance Selected]');

    /* src\components\Header.svelte generated by Svelte v3.46.4 */
    const file$6 = "src\\components\\Header.svelte";

    function create_fragment$7(ctx) {
    	let header;
    	let img0;
    	let img0_src_value;
    	let t0;
    	let h1;
    	let t2;
    	let h2;
    	let t3;
    	let t4;
    	let img1;
    	let img1_src_value;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			header = element("header");
    			img0 = element("img");
    			t0 = space();
    			h1 = element("h1");
    			h1.textContent = "INTEGRATIO";
    			t2 = space();
    			h2 = element("h2");
    			t3 = text(/*instance*/ ctx[0]);
    			t4 = space();
    			img1 = element("img");
    			attr_dev(img0, "alt", "Logo");
    			attr_dev(img0, "class", "logo svelte-1sgvuo9");
    			if (!src_url_equal(img0.src, img0_src_value = "../static/icon-borderless.svg")) attr_dev(img0, "src", img0_src_value);
    			add_location(img0, file$6, 8, 2, 189);
    			attr_dev(h1, "class", "svelte-1sgvuo9");
    			add_location(h1, file$6, 9, 2, 260);
    			attr_dev(h2, "class", "svelte-1sgvuo9");
    			add_location(h2, file$6, 10, 2, 283);
    			attr_dev(img1, "alt", "Help Button");
    			attr_dev(img1, "class", "help svelte-1sgvuo9");
    			if (!src_url_equal(img1.src, img1_src_value = "../static/help-circle.svg")) attr_dev(img1, "src", img1_src_value);
    			add_location(img1, file$6, 11, 2, 306);
    			attr_dev(header, "class", "svelte-1sgvuo9");
    			add_location(header, file$6, 7, 0, 177);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, header, anchor);
    			append_dev(header, img0);
    			append_dev(header, t0);
    			append_dev(header, h1);
    			append_dev(header, t2);
    			append_dev(header, h2);
    			append_dev(h2, t3);
    			append_dev(header, t4);
    			append_dev(header, img1);

    			if (!mounted) {
    				dispose = listen_dev(img1, "click", /*click_handler*/ ctx[1], false, false, false);
    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*instance*/ 1) set_data_dev(t3, /*instance*/ ctx[0]);
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(header);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$7.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance_1($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Header', slots, []);
    	let instance;

    	currentInstance.subscribe(value => {
    		$$invalidate(0, instance = value);
    	});

    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Header> was created with unknown prop '${key}'`);
    	});

    	const click_handler = () => window.open("https://github.com/Windyle/Integratio/issues", "_blank").focus();
    	$$self.$capture_state = () => ({ currentInstance, instance });

    	$$self.$inject_state = $$props => {
    		if ('instance' in $$props) $$invalidate(0, instance = $$props.instance);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [instance, click_handler];
    }

    class Header extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance_1, create_fragment$7, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Header",
    			options,
    			id: create_fragment$7.name
    		});
    	}
    }

    /* src\components\Nav\NewInstance.svelte generated by Svelte v3.46.4 */

    const file$5 = "src\\components\\Nav\\NewInstance.svelte";

    function create_fragment$6(ctx) {
    	let div0;
    	let t0;
    	let div1;
    	let input0;
    	let t1;
    	let input1;
    	let t2;
    	let button;
    	let t4;
    	let div2;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			div0 = element("div");
    			t0 = space();
    			div1 = element("div");
    			input0 = element("input");
    			t1 = space();
    			input1 = element("input");
    			t2 = space();
    			button = element("button");
    			button.textContent = "Add Instance";
    			t4 = space();
    			div2 = element("div");
    			attr_dev(div0, "class", "overlay svelte-ic6o2i");
    			add_location(div0, file$5, 20, 0, 721);
    			attr_dev(input0, "type", "text");
    			attr_dev(input0, "id", "instance-name");
    			attr_dev(input0, "placeholder", "Instance Name");
    			attr_dev(input0, "class", "svelte-ic6o2i");
    			add_location(input0, file$5, 22, 2, 773);
    			attr_dev(input1, "type", "text");
    			attr_dev(input1, "id", "instance-path");
    			attr_dev(input1, "placeholder", "Instance Root Folder Path");
    			attr_dev(input1, "class", "svelte-ic6o2i");
    			add_location(input1, file$5, 28, 2, 894);
    			attr_dev(button, "type", "button");
    			attr_dev(button, "id", "add-instance");
    			attr_dev(button, "class", "svelte-ic6o2i");
    			add_location(button, file$5, 34, 2, 1023);
    			attr_dev(div1, "class", "container svelte-ic6o2i");
    			add_location(div1, file$5, 21, 0, 746);
    			attr_dev(div2, "class", "tail svelte-ic6o2i");
    			add_location(div2, file$5, 36, 0, 1094);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div0, anchor);
    			insert_dev(target, t0, anchor);
    			insert_dev(target, div1, anchor);
    			append_dev(div1, input0);
    			set_input_value(input0, /*instanceName*/ ctx[1]);
    			append_dev(div1, t1);
    			append_dev(div1, input1);
    			set_input_value(input1, /*filepath*/ ctx[0]);
    			append_dev(div1, t2);
    			append_dev(div1, button);
    			insert_dev(target, t4, anchor);
    			insert_dev(target, div2, anchor);

    			if (!mounted) {
    				dispose = [
    					listen_dev(input0, "input", /*input0_input_handler*/ ctx[2]),
    					listen_dev(input1, "input", /*input1_input_handler*/ ctx[3])
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*instanceName*/ 2 && input0.value !== /*instanceName*/ ctx[1]) {
    				set_input_value(input0, /*instanceName*/ ctx[1]);
    			}

    			if (dirty & /*filepath*/ 1 && input1.value !== /*filepath*/ ctx[0]) {
    				set_input_value(input1, /*filepath*/ ctx[0]);
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div0);
    			if (detaching) detach_dev(t0);
    			if (detaching) detach_dev(div1);
    			if (detaching) detach_dev(t4);
    			if (detaching) detach_dev(div2);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$6.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function loadInstanceStructure() {
    	
    } //     const instanceStructure = fs.readFileSync('./instance-structure.json', 'utf8');
    //     return JSON.parse(instanceStructure);

    function instance$6($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('NewInstance', slots, []);
    	let filepath;
    	let instanceName;
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<NewInstance> was created with unknown prop '${key}'`);
    	});

    	function input0_input_handler() {
    		instanceName = this.value;
    		$$invalidate(1, instanceName);
    	}

    	function input1_input_handler() {
    		filepath = this.value;
    		$$invalidate(0, filepath);
    	}

    	$$self.$capture_state = () => ({
    		filepath,
    		instanceName,
    		loadInstanceStructure
    	});

    	$$self.$inject_state = $$props => {
    		if ('filepath' in $$props) $$invalidate(0, filepath = $$props.filepath);
    		if ('instanceName' in $$props) $$invalidate(1, instanceName = $$props.instanceName);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [filepath, instanceName, input0_input_handler, input1_input_handler];
    }

    class NewInstance extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$6, create_fragment$6, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "NewInstance",
    			options,
    			id: create_fragment$6.name
    		});
    	}
    }

    const hideSearch = writable(true);

    /* src\components\Nav\Search.svelte generated by Svelte v3.46.4 */
    const file$4 = "src\\components\\Nav\\Search.svelte";

    function create_fragment$5(ctx) {
    	let div1;
    	let input;
    	let t;
    	let div0;
    	let img;
    	let img_src_value;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			div1 = element("div");
    			input = element("input");
    			t = space();
    			div0 = element("div");
    			img = element("img");
    			attr_dev(input, "type", "text");
    			attr_dev(input, "id", "search");
    			attr_dev(input, "placeholder", "Search...");
    			attr_dev(input, "autocomplete", "off");
    			attr_dev(input, "class", "svelte-1ilzpa6");
    			add_location(input, file$4, 11, 2, 272);
    			attr_dev(img, "alt", "close-search");
    			if (!src_url_equal(img.src, img_src_value = "../static/x.svg")) attr_dev(img, "src", img_src_value);
    			add_location(img, file$4, 13, 4, 408);
    			attr_dev(div0, "class", "close-search svelte-1ilzpa6");
    			add_location(div0, file$4, 12, 2, 352);
    			attr_dev(div1, "class", "container svelte-1ilzpa6");
    			add_location(div1, file$4, 10, 0, 245);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div1, anchor);
    			append_dev(div1, input);
    			append_dev(div1, t);
    			append_dev(div1, div0);
    			append_dev(div0, img);

    			if (!mounted) {
    				dispose = listen_dev(div0, "click", /*toggleSearch*/ ctx[0], false, false, false);
    				mounted = true;
    			}
    		},
    		p: noop,
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div1);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$5.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$5($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Search', slots, []);
    	let hideSearchAttr;

    	hideSearch.subscribe(value => {
    		hideSearchAttr = value;
    	});

    	function toggleSearch() {
    		hideSearch.set(!hideSearchAttr);
    	}

    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Search> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({ hideSearch, hideSearchAttr, toggleSearch });

    	$$self.$inject_state = $$props => {
    		if ('hideSearchAttr' in $$props) hideSearchAttr = $$props.hideSearchAttr;
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [toggleSearch];
    }

    class Search extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$5, create_fragment$5, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Search",
    			options,
    			id: create_fragment$5.name
    		});
    	}
    }

    /* src\components\Nav\Treeview.svelte generated by Svelte v3.46.4 */

    const file$3 = "src\\components\\Nav\\Treeview.svelte";

    function get_each_context$1(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[10] = list[i];
    	child_ctx[11] = list;
    	child_ctx[12] = i;
    	return child_ctx;
    }

    function get_each_context_1(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[13] = list[i];
    	child_ctx[14] = list;
    	child_ctx[15] = i;
    	return child_ctx;
    }

    function get_each_context_2(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[16] = list[i];
    	child_ctx[17] = list;
    	child_ctx[18] = i;
    	return child_ctx;
    }

    function get_each_context_3(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[19] = list[i];
    	return child_ctx;
    }

    // (126:4) {#if instance.expanded}
    function create_if_block(ctx) {
    	let each_1_anchor;
    	let each_value_1 = /*instance*/ ctx[10].packages;
    	validate_each_argument(each_value_1);
    	let each_blocks = [];

    	for (let i = 0; i < each_value_1.length; i += 1) {
    		each_blocks[i] = create_each_block_1(get_each_context_1(ctx, each_value_1, i));
    	}

    	const block = {
    		c: function create() {
    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			each_1_anchor = empty();
    		},
    		m: function mount(target, anchor) {
    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(target, anchor);
    			}

    			insert_dev(target, each_1_anchor, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*instances*/ 4) {
    				each_value_1 = /*instance*/ ctx[10].packages;
    				validate_each_argument(each_value_1);
    				let i;

    				for (i = 0; i < each_value_1.length; i += 1) {
    					const child_ctx = get_each_context_1(ctx, each_value_1, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block_1(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(each_1_anchor.parentNode, each_1_anchor);
    					}
    				}

    				for (; i < each_blocks.length; i += 1) {
    					each_blocks[i].d(1);
    				}

    				each_blocks.length = each_value_1.length;
    			}
    		},
    		d: function destroy(detaching) {
    			destroy_each(each_blocks, detaching);
    			if (detaching) detach_dev(each_1_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block.name,
    		type: "if",
    		source: "(126:4) {#if instance.expanded}",
    		ctx
    	});

    	return block;
    }

    // (133:7) {#if inst_package.expanded}
    function create_if_block_1(ctx) {
    	let each_1_anchor;
    	let each_value_2 = /*inst_package*/ ctx[13].entities;
    	validate_each_argument(each_value_2);
    	let each_blocks = [];

    	for (let i = 0; i < each_value_2.length; i += 1) {
    		each_blocks[i] = create_each_block_2(get_each_context_2(ctx, each_value_2, i));
    	}

    	const block = {
    		c: function create() {
    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			each_1_anchor = empty();
    		},
    		m: function mount(target, anchor) {
    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(target, anchor);
    			}

    			insert_dev(target, each_1_anchor, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*instances*/ 4) {
    				each_value_2 = /*inst_package*/ ctx[13].entities;
    				validate_each_argument(each_value_2);
    				let i;

    				for (i = 0; i < each_value_2.length; i += 1) {
    					const child_ctx = get_each_context_2(ctx, each_value_2, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block_2(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(each_1_anchor.parentNode, each_1_anchor);
    					}
    				}

    				for (; i < each_blocks.length; i += 1) {
    					each_blocks[i].d(1);
    				}

    				each_blocks.length = each_value_2.length;
    			}
    		},
    		d: function destroy(detaching) {
    			destroy_each(each_blocks, detaching);
    			if (detaching) detach_dev(each_1_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_1.name,
    		type: "if",
    		source: "(133:7) {#if inst_package.expanded}",
    		ctx
    	});

    	return block;
    }

    // (144:10) {#if entity.expanded}
    function create_if_block_2(ctx) {
    	let each_1_anchor;
    	let each_value_3 = /*entity*/ ctx[16].methods;
    	validate_each_argument(each_value_3);
    	let each_blocks = [];

    	for (let i = 0; i < each_value_3.length; i += 1) {
    		each_blocks[i] = create_each_block_3(get_each_context_3(ctx, each_value_3, i));
    	}

    	const block = {
    		c: function create() {
    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			each_1_anchor = empty();
    		},
    		m: function mount(target, anchor) {
    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(target, anchor);
    			}

    			insert_dev(target, each_1_anchor, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*instances*/ 4) {
    				each_value_3 = /*entity*/ ctx[16].methods;
    				validate_each_argument(each_value_3);
    				let i;

    				for (i = 0; i < each_value_3.length; i += 1) {
    					const child_ctx = get_each_context_3(ctx, each_value_3, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block_3(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(each_1_anchor.parentNode, each_1_anchor);
    					}
    				}

    				for (; i < each_blocks.length; i += 1) {
    					each_blocks[i].d(1);
    				}

    				each_blocks.length = each_value_3.length;
    			}
    		},
    		d: function destroy(detaching) {
    			destroy_each(each_blocks, detaching);
    			if (detaching) detach_dev(each_1_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_2.name,
    		type: "if",
    		source: "(144:10) {#if entity.expanded}",
    		ctx
    	});

    	return block;
    }

    // (145:11) {#each entity.methods as method}
    function create_each_block_3(ctx) {
    	let div1;
    	let div0;
    	let t0;
    	let p;
    	let t1_value = /*method*/ ctx[19].text + "";
    	let t1;
    	let p_class_value;
    	let t2;
    	let div1_id_value;

    	const block = {
    		c: function create() {
    			div1 = element("div");
    			div0 = element("div");
    			t0 = space();
    			p = element("p");
    			t1 = text(t1_value);
    			t2 = space();
    			attr_dev(div0, "class", "circle svelte-10d7h3x");
    			add_location(div0, file$3, 146, 13, 5042);
    			attr_dev(p, "class", p_class_value = "" + (null_to_empty(/*method*/ ctx[19].text.toLowerCase()) + " svelte-10d7h3x"));
    			add_location(p, file$3, 147, 13, 5079);
    			attr_dev(div1, "class", "method svelte-10d7h3x");
    			attr_dev(div1, "id", div1_id_value = /*method*/ ctx[19].id);
    			add_location(div1, file$3, 145, 12, 4992);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div1, anchor);
    			append_dev(div1, div0);
    			append_dev(div1, t0);
    			append_dev(div1, p);
    			append_dev(p, t1);
    			append_dev(div1, t2);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*instances*/ 4 && t1_value !== (t1_value = /*method*/ ctx[19].text + "")) set_data_dev(t1, t1_value);

    			if (dirty & /*instances*/ 4 && p_class_value !== (p_class_value = "" + (null_to_empty(/*method*/ ctx[19].text.toLowerCase()) + " svelte-10d7h3x"))) {
    				attr_dev(p, "class", p_class_value);
    			}

    			if (dirty & /*instances*/ 4 && div1_id_value !== (div1_id_value = /*method*/ ctx[19].id)) {
    				attr_dev(div1, "id", div1_id_value);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div1);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block_3.name,
    		type: "each",
    		source: "(145:11) {#each entity.methods as method}",
    		ctx
    	});

    	return block;
    }

    // (134:8) {#each inst_package.entities as entity}
    function create_each_block_2(ctx) {
    	let div2;
    	let div1;
    	let div0;
    	let t0;
    	let p;
    	let t1_value = /*entity*/ ctx[16].id + "";
    	let t1;
    	let t2;
    	let t3;
    	let div2_id_value;
    	let mounted;
    	let dispose;
    	let if_block = /*entity*/ ctx[16].expanded && create_if_block_2(ctx);

    	function click_handler_3() {
    		return /*click_handler_3*/ ctx[8](/*entity*/ ctx[16], /*each_value_2*/ ctx[17], /*entity_index*/ ctx[18]);
    	}

    	const block = {
    		c: function create() {
    			div2 = element("div");
    			div1 = element("div");
    			div0 = element("div");
    			t0 = space();
    			p = element("p");
    			t1 = text(t1_value);
    			t2 = space();
    			if (if_block) if_block.c();
    			t3 = space();
    			attr_dev(div0, "class", "chevron svelte-10d7h3x");
    			toggle_class(div0, "expanded", /*entity*/ ctx[16].expanded);
    			add_location(div0, file$3, 140, 11, 4795);
    			attr_dev(p, "class", "svelte-10d7h3x");
    			add_location(p, file$3, 141, 11, 4864);
    			attr_dev(div1, "class", "text-container svelte-10d7h3x");
    			add_location(div1, file$3, 139, 10, 4754);
    			attr_dev(div2, "class", "entity svelte-10d7h3x");
    			attr_dev(div2, "id", div2_id_value = /*entity*/ ctx[16].id);
    			add_location(div2, file$3, 134, 9, 4609);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div2, anchor);
    			append_dev(div2, div1);
    			append_dev(div1, div0);
    			append_dev(div1, t0);
    			append_dev(div1, p);
    			append_dev(p, t1);
    			append_dev(div2, t2);
    			if (if_block) if_block.m(div2, null);
    			append_dev(div2, t3);

    			if (!mounted) {
    				dispose = listen_dev(div2, "click", click_handler_3, false, false, false);
    				mounted = true;
    			}
    		},
    		p: function update(new_ctx, dirty) {
    			ctx = new_ctx;

    			if (dirty & /*instances*/ 4) {
    				toggle_class(div0, "expanded", /*entity*/ ctx[16].expanded);
    			}

    			if (dirty & /*instances*/ 4 && t1_value !== (t1_value = /*entity*/ ctx[16].id + "")) set_data_dev(t1, t1_value);

    			if (/*entity*/ ctx[16].expanded) {
    				if (if_block) {
    					if_block.p(ctx, dirty);
    				} else {
    					if_block = create_if_block_2(ctx);
    					if_block.c();
    					if_block.m(div2, t3);
    				}
    			} else if (if_block) {
    				if_block.d(1);
    				if_block = null;
    			}

    			if (dirty & /*instances*/ 4 && div2_id_value !== (div2_id_value = /*entity*/ ctx[16].id)) {
    				attr_dev(div2, "id", div2_id_value);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div2);
    			if (if_block) if_block.d();
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block_2.name,
    		type: "each",
    		source: "(134:8) {#each inst_package.entities as entity}",
    		ctx
    	});

    	return block;
    }

    // (127:5) {#each instance.packages as inst_package}
    function create_each_block_1(ctx) {
    	let div2;
    	let div1;
    	let div0;
    	let t0;
    	let p;
    	let t1_value = /*inst_package*/ ctx[13].id + "";
    	let t1;
    	let t2;
    	let t3;
    	let div2_id_value;
    	let mounted;
    	let dispose;

    	function click_handler_2() {
    		return /*click_handler_2*/ ctx[7](/*inst_package*/ ctx[13], /*each_value_1*/ ctx[14], /*inst_package_index*/ ctx[15]);
    	}

    	let if_block = /*inst_package*/ ctx[13].expanded && create_if_block_1(ctx);

    	const block = {
    		c: function create() {
    			div2 = element("div");
    			div1 = element("div");
    			div0 = element("div");
    			t0 = space();
    			p = element("p");
    			t1 = text(t1_value);
    			t2 = space();
    			if (if_block) if_block.c();
    			t3 = space();
    			attr_dev(div0, "class", "chevron svelte-10d7h3x");
    			toggle_class(div0, "expanded", /*inst_package*/ ctx[13].expanded);
    			add_location(div0, file$3, 129, 8, 4402);
    			attr_dev(p, "class", "svelte-10d7h3x");
    			add_location(p, file$3, 130, 8, 4474);
    			attr_dev(div1, "class", "text-container svelte-10d7h3x");
    			add_location(div1, file$3, 128, 7, 4298);
    			attr_dev(div2, "class", "package svelte-10d7h3x");
    			attr_dev(div2, "id", div2_id_value = /*inst_package*/ ctx[13].id);
    			add_location(div2, file$3, 127, 6, 4247);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div2, anchor);
    			append_dev(div2, div1);
    			append_dev(div1, div0);
    			append_dev(div1, t0);
    			append_dev(div1, p);
    			append_dev(p, t1);
    			append_dev(div2, t2);
    			if (if_block) if_block.m(div2, null);
    			append_dev(div2, t3);

    			if (!mounted) {
    				dispose = listen_dev(div1, "click", click_handler_2, false, false, false);
    				mounted = true;
    			}
    		},
    		p: function update(new_ctx, dirty) {
    			ctx = new_ctx;

    			if (dirty & /*instances*/ 4) {
    				toggle_class(div0, "expanded", /*inst_package*/ ctx[13].expanded);
    			}

    			if (dirty & /*instances*/ 4 && t1_value !== (t1_value = /*inst_package*/ ctx[13].id + "")) set_data_dev(t1, t1_value);

    			if (/*inst_package*/ ctx[13].expanded) {
    				if (if_block) {
    					if_block.p(ctx, dirty);
    				} else {
    					if_block = create_if_block_1(ctx);
    					if_block.c();
    					if_block.m(div2, t3);
    				}
    			} else if (if_block) {
    				if_block.d(1);
    				if_block = null;
    			}

    			if (dirty & /*instances*/ 4 && div2_id_value !== (div2_id_value = /*inst_package*/ ctx[13].id)) {
    				attr_dev(div2, "id", div2_id_value);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div2);
    			if (if_block) if_block.d();
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block_1.name,
    		type: "each",
    		source: "(127:5) {#each instance.packages as inst_package}",
    		ctx
    	});

    	return block;
    }

    // (120:2) {#each instances as instance}
    function create_each_block$1(ctx) {
    	let div2;
    	let div1;
    	let div0;
    	let t0;
    	let p;
    	let t1_value = /*instance*/ ctx[10].text + "";
    	let t1;
    	let t2;
    	let t3;
    	let div2_id_value;
    	let mounted;
    	let dispose;

    	function click_handler_1() {
    		return /*click_handler_1*/ ctx[6](/*instance*/ ctx[10], /*each_value*/ ctx[11], /*instance_index*/ ctx[12]);
    	}

    	let if_block = /*instance*/ ctx[10].expanded && create_if_block(ctx);

    	function click_handler_4() {
    		return /*click_handler_4*/ ctx[9](/*instance*/ ctx[10]);
    	}

    	const block = {
    		c: function create() {
    			div2 = element("div");
    			div1 = element("div");
    			div0 = element("div");
    			t0 = space();
    			p = element("p");
    			t1 = text(t1_value);
    			t2 = space();
    			if (if_block) if_block.c();
    			t3 = space();
    			attr_dev(div0, "class", "chevron svelte-10d7h3x");
    			toggle_class(div0, "expanded", /*instance*/ ctx[10].expanded);
    			add_location(div0, file$3, 122, 5, 4063);
    			attr_dev(p, "class", "svelte-10d7h3x");
    			add_location(p, file$3, 123, 5, 4128);
    			attr_dev(div1, "class", "text-container svelte-10d7h3x");
    			add_location(div1, file$3, 121, 4, 3970);
    			attr_dev(div2, "class", "root svelte-10d7h3x");
    			attr_dev(div2, "id", div2_id_value = /*instance*/ ctx[10].id);
    			add_location(div2, file$3, 120, 3, 3875);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div2, anchor);
    			append_dev(div2, div1);
    			append_dev(div1, div0);
    			append_dev(div1, t0);
    			append_dev(div1, p);
    			append_dev(p, t1);
    			append_dev(div2, t2);
    			if (if_block) if_block.m(div2, null);
    			append_dev(div2, t3);

    			if (!mounted) {
    				dispose = [
    					listen_dev(div1, "click", click_handler_1, false, false, false),
    					listen_dev(div2, "click", click_handler_4, false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(new_ctx, dirty) {
    			ctx = new_ctx;

    			if (dirty & /*instances*/ 4) {
    				toggle_class(div0, "expanded", /*instance*/ ctx[10].expanded);
    			}

    			if (dirty & /*instances*/ 4 && t1_value !== (t1_value = /*instance*/ ctx[10].text + "")) set_data_dev(t1, t1_value);

    			if (/*instance*/ ctx[10].expanded) {
    				if (if_block) {
    					if_block.p(ctx, dirty);
    				} else {
    					if_block = create_if_block(ctx);
    					if_block.c();
    					if_block.m(div2, t3);
    				}
    			} else if (if_block) {
    				if_block.d(1);
    				if_block = null;
    			}

    			if (dirty & /*instances*/ 4 && div2_id_value !== (div2_id_value = /*instance*/ ctx[10].id)) {
    				attr_dev(div2, "id", div2_id_value);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div2);
    			if (if_block) if_block.d();
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block$1.name,
    		type: "each",
    		source: "(120:2) {#each instances as instance}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$4(ctx) {
    	let div0;
    	let newinstance;
    	let t0;
    	let div6;
    	let div4;
    	let p;
    	let t2;
    	let div1;
    	let t3;
    	let div2;
    	let t4;
    	let div3;
    	let search;
    	let t5;
    	let div5;
    	let current;
    	let mounted;
    	let dispose;
    	newinstance = new NewInstance({ $$inline: true });
    	search = new Search({ $$inline: true });
    	let each_value = /*instances*/ ctx[2];
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block$1(get_each_context$1(ctx, each_value, i));
    	}

    	const block = {
    		c: function create() {
    			div0 = element("div");
    			create_component(newinstance.$$.fragment);
    			t0 = space();
    			div6 = element("div");
    			div4 = element("div");
    			p = element("p");
    			p.textContent = "INSTANCES";
    			t2 = space();
    			div1 = element("div");
    			t3 = space();
    			div2 = element("div");
    			t4 = space();
    			div3 = element("div");
    			create_component(search.$$.fragment);
    			t5 = space();
    			div5 = element("div");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			attr_dev(div0, "class", "svelte-10d7h3x");
    			toggle_class(div0, "hide", /*hideNewInstance*/ ctx[1]);
    			add_location(div0, file$3, 103, 0, 3483);
    			attr_dev(p, "class", "svelte-10d7h3x");
    			add_location(p, file$3, 110, 2, 3599);
    			attr_dev(div1, "class", "search svelte-10d7h3x");
    			add_location(div1, file$3, 111, 2, 3619);
    			attr_dev(div2, "class", "new svelte-10d7h3x");
    			add_location(div2, file$3, 112, 2, 3669);
    			attr_dev(div3, "class", "svelte-10d7h3x");
    			toggle_class(div3, "hide", /*boolHideSearch*/ ctx[0]);
    			add_location(div3, file$3, 114, 2, 3746);
    			attr_dev(div4, "class", "header svelte-10d7h3x");
    			add_location(div4, file$3, 109, 1, 3575);
    			attr_dev(div5, "class", "content svelte-10d7h3x");
    			add_location(div5, file$3, 118, 1, 3816);
    			attr_dev(div6, "class", "container svelte-10d7h3x");
    			add_location(div6, file$3, 108, 0, 3549);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div0, anchor);
    			mount_component(newinstance, div0, null);
    			insert_dev(target, t0, anchor);
    			insert_dev(target, div6, anchor);
    			append_dev(div6, div4);
    			append_dev(div4, p);
    			append_dev(div4, t2);
    			append_dev(div4, div1);
    			append_dev(div4, t3);
    			append_dev(div4, div2);
    			append_dev(div4, t4);
    			append_dev(div4, div3);
    			mount_component(search, div3, null);
    			append_dev(div6, t5);
    			append_dev(div6, div5);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(div5, null);
    			}

    			current = true;

    			if (!mounted) {
    				dispose = [
    					listen_dev(div1, "click", /*toggleSearch*/ ctx[3], false, false, false),
    					listen_dev(div2, "click", /*click_handler*/ ctx[5], false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*hideNewInstance*/ 2) {
    				toggle_class(div0, "hide", /*hideNewInstance*/ ctx[1]);
    			}

    			if (dirty & /*boolHideSearch*/ 1) {
    				toggle_class(div3, "hide", /*boolHideSearch*/ ctx[0]);
    			}

    			if (dirty & /*instances, updateCurrentInstance*/ 20) {
    				each_value = /*instances*/ ctx[2];
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context$1(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block$1(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(div5, null);
    					}
    				}

    				for (; i < each_blocks.length; i += 1) {
    					each_blocks[i].d(1);
    				}

    				each_blocks.length = each_value.length;
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(newinstance.$$.fragment, local);
    			transition_in(search.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(newinstance.$$.fragment, local);
    			transition_out(search.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div0);
    			destroy_component(newinstance);
    			if (detaching) detach_dev(t0);
    			if (detaching) detach_dev(div6);
    			destroy_component(search);
    			destroy_each(each_blocks, detaching);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$4.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$4($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Treeview', slots, []);
    	let boolHideSearch;

    	hideSearch.subscribe(value => {
    		$$invalidate(0, boolHideSearch = value);
    	});

    	function toggleSearch() {
    		hideSearch.set(!boolHideSearch);
    	}

    	function updateCurrentInstance(instance) {
    		currentInstance.set(instance);
    	}

    	// Current attributes
    	let hideNewInstance = true;

    	let instances = [
    		{
    			id: 'testaccount',
    			text: 'Account Test',
    			expanded: false,
    			packages: [
    				{
    					id: "tst",
    					text: "Tst",
    					expanded: false,
    					entities: [
    						{
    							id: 'Account',
    							expanded: false,
    							methods: [
    								{ id: 'getaccount', text: 'GET' },
    								{ id: 'postaccount', text: 'POST' },
    								{ id: 'patchaccount', text: 'PATCH' },
    								{ id: 'deleteaccount', text: 'DELETE' }
    							]
    						},
    						{
    							id: 'tstDetailDiscounts',
    							expanded: false,
    							methods: [
    								{ id: 'getaccount', text: 'GET' },
    								{ id: 'postaccount', text: 'POST' },
    								{ id: 'patchaccount', text: 'PATCH' },
    								{ id: 'deleteaccount', text: 'DELETE' }
    							]
    						},
    						{
    							id: 'tstDetailAccountBillingInfo',
    							expanded: false,
    							methods: [
    								{ id: 'getaccount', text: 'GET' },
    								{ id: 'postaccount', text: 'POST' },
    								{ id: 'patchaccount', text: 'PATCH' },
    								{ id: 'deleteaccount', text: 'DELETE' }
    							]
    						}
    					]
    				}
    			]
    		}
    	];

    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Treeview> was created with unknown prop '${key}'`);
    	});

    	const click_handler = () => $$invalidate(1, hideNewInstance = !hideNewInstance);
    	const click_handler_1 = (instance, each_value, instance_index) => $$invalidate(2, each_value[instance_index].expanded = !instance.expanded, instances);
    	const click_handler_2 = (inst_package, each_value_1, inst_package_index) => $$invalidate(2, each_value_1[inst_package_index].expanded = !inst_package.expanded, instances);
    	const click_handler_3 = (entity, each_value_2, entity_index) => $$invalidate(2, each_value_2[entity_index].expanded = !entity.expanded, instances);
    	const click_handler_4 = instance => updateCurrentInstance(instance.text);

    	$$self.$capture_state = () => ({
    		NewInstance,
    		Search,
    		hideSearch,
    		boolHideSearch,
    		toggleSearch,
    		currentInstance,
    		updateCurrentInstance,
    		hideNewInstance,
    		instances
    	});

    	$$self.$inject_state = $$props => {
    		if ('boolHideSearch' in $$props) $$invalidate(0, boolHideSearch = $$props.boolHideSearch);
    		if ('hideNewInstance' in $$props) $$invalidate(1, hideNewInstance = $$props.hideNewInstance);
    		if ('instances' in $$props) $$invalidate(2, instances = $$props.instances);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [
    		boolHideSearch,
    		hideNewInstance,
    		instances,
    		toggleSearch,
    		updateCurrentInstance,
    		click_handler,
    		click_handler_1,
    		click_handler_2,
    		click_handler_3,
    		click_handler_4
    	];
    }

    class Treeview extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$4, create_fragment$4, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Treeview",
    			options,
    			id: create_fragment$4.name
    		});
    	}
    }

    /* src\components\Nav\Actions.svelte generated by Svelte v3.46.4 */

    const file$2 = "src\\components\\Nav\\Actions.svelte";

    function get_each_context(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[1] = list[i];
    	return child_ctx;
    }

    // (10:1) {#each actions as action}
    function create_each_block(ctx) {
    	let div;
    	let p;
    	let t_value = /*action*/ ctx[1].text + "";
    	let t;

    	const block = {
    		c: function create() {
    			div = element("div");
    			p = element("p");
    			t = text(t_value);
    			attr_dev(p, "class", "svelte-th6ax4");
    			add_location(p, file$2, 10, 70, 465);
    			attr_dev(div, "class", "button svelte-th6ax4");
    			attr_dev(div, "id", /*action*/ ctx[1].id);
    			toggle_class(div, "disabled", /*action*/ ctx[1].disabled);
    			add_location(div, file$2, 10, 2, 397);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, p);
    			append_dev(p, t);
    		},
    		p: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block.name,
    		type: "each",
    		source: "(10:1) {#each actions as action}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$3(ctx) {
    	let div;
    	let each_value = /*actions*/ ctx[0];
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
    	}

    	const block = {
    		c: function create() {
    			div = element("div");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			attr_dev(div, "class", "container svelte-th6ax4");
    			add_location(div, file$2, 8, 0, 342);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(div, null);
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*actions*/ 1) {
    				each_value = /*actions*/ ctx[0];
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(div, null);
    					}
    				}

    				for (; i < each_blocks.length; i += 1) {
    					each_blocks[i].d(1);
    				}

    				each_blocks.length = each_value.length;
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			destroy_each(each_blocks, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$3.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$3($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Actions', slots, []);

    	let actions = [
    		{
    			id: 'sync',
    			text: 'SYNC WITH PACKAGE',
    			disabled: true
    		},
    		{
    			id: 'export-postman',
    			text: 'EXPORT FOR POSTMAN',
    			disabled: true
    		},
    		{
    			id: 'random-fill',
    			text: 'RANDOM BODY FILLER',
    			disabled: true
    		},
    		{
    			id: 'export-structure',
    			text: 'EXPORT DATA STRUCTURE',
    			disabled: true
    		}
    	];

    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Actions> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({ actions });

    	$$self.$inject_state = $$props => {
    		if ('actions' in $$props) $$invalidate(0, actions = $$props.actions);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [actions];
    }

    class Actions extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$3, create_fragment$3, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Actions",
    			options,
    			id: create_fragment$3.name
    		});
    	}
    }

    /* src\components\Nav.svelte generated by Svelte v3.46.4 */
    const file$1 = "src\\components\\Nav.svelte";

    function create_fragment$2(ctx) {
    	let nav;
    	let treeview;
    	let t0;
    	let hr;
    	let t1;
    	let actions;
    	let current;
    	treeview = new Treeview({ $$inline: true });
    	actions = new Actions({ $$inline: true });

    	const block = {
    		c: function create() {
    			nav = element("nav");
    			create_component(treeview.$$.fragment);
    			t0 = space();
    			hr = element("hr");
    			t1 = space();
    			create_component(actions.$$.fragment);
    			attr_dev(hr, "class", "svelte-ebhuig");
    			add_location(hr, file$1, 8, 1, 142);
    			attr_dev(nav, "class", "svelte-ebhuig");
    			add_location(nav, file$1, 5, 0, 117);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, nav, anchor);
    			mount_component(treeview, nav, null);
    			append_dev(nav, t0);
    			append_dev(nav, hr);
    			append_dev(nav, t1);
    			mount_component(actions, nav, null);
    			current = true;
    		},
    		p: noop,
    		i: function intro(local) {
    			if (current) return;
    			transition_in(treeview.$$.fragment, local);
    			transition_in(actions.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(treeview.$$.fragment, local);
    			transition_out(actions.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(nav);
    			destroy_component(treeview);
    			destroy_component(actions);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$2.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$2($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Nav', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Nav> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({ Treeview, Actions });
    	return [];
    }

    class Nav extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$2, create_fragment$2, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Nav",
    			options,
    			id: create_fragment$2.name
    		});
    	}
    }

    /* src\components\Main.svelte generated by Svelte v3.46.4 */

    const file = "src\\components\\Main.svelte";

    function create_fragment$1(ctx) {
    	let main;

    	const block = {
    		c: function create() {
    			main = element("main");
    			attr_dev(main, "class", "svelte-1m7lewa");
    			add_location(main, file, 0, 0, 0);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, main, anchor);
    		},
    		p: noop,
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(main);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$1.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$1($$self, $$props) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Main', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Main> was created with unknown prop '${key}'`);
    	});

    	return [];
    }

    class Main extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$1, create_fragment$1, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Main",
    			options,
    			id: create_fragment$1.name
    		});
    	}
    }

    /* src\App.svelte generated by Svelte v3.46.4 */

    function create_fragment(ctx) {
    	let header;
    	let t0;
    	let nav;
    	let t1;
    	let main;
    	let current;
    	header = new Header({ $$inline: true });
    	nav = new Nav({ $$inline: true });
    	main = new Main({ $$inline: true });

    	const block = {
    		c: function create() {
    			create_component(header.$$.fragment);
    			t0 = space();
    			create_component(nav.$$.fragment);
    			t1 = space();
    			create_component(main.$$.fragment);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			mount_component(header, target, anchor);
    			insert_dev(target, t0, anchor);
    			mount_component(nav, target, anchor);
    			insert_dev(target, t1, anchor);
    			mount_component(main, target, anchor);
    			current = true;
    		},
    		p: noop,
    		i: function intro(local) {
    			if (current) return;
    			transition_in(header.$$.fragment, local);
    			transition_in(nav.$$.fragment, local);
    			transition_in(main.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(header.$$.fragment, local);
    			transition_out(nav.$$.fragment, local);
    			transition_out(main.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(header, detaching);
    			if (detaching) detach_dev(t0);
    			destroy_component(nav, detaching);
    			if (detaching) detach_dev(t1);
    			destroy_component(main, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('App', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<App> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({ Header, Nav, Main });
    	return [];
    }

    class App extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance, create_fragment, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "App",
    			options,
    			id: create_fragment.name
    		});
    	}
    }

    const app = new App({
        target: document.body,
        props: {
            name: 'world'
        }
    });

    return app;

})();
//# sourceMappingURL=bundle.js.map
