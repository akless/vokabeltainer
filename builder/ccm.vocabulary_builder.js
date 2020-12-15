/**
 * @overview ccm component for building a vocabulary trainer
 * @author André Kless <andre.kless@web.de> 2020
 * @version latest (1.0.0)
 * @changes
 * version 1.0.0 (08.12.2020)
 */

( () => {

  const component = {
    name: 'vocabulary_builder',
    ccm: 'https://ccmjs.github.io/ccm/versions/ccm-26.1.0.js',
    config: {
      "css": [ "ccm.load",
        [  // serial
          "https://ccmjs.github.io/akless-components/libs/bootstrap-4/css/bootstrap.min.css",
          "https://akless.github.io/vokabeltrainer/builder/resources/default.css"
        ]
      ],
  //  "data": { "store": [ "ccm.store" ] },
      "helper": [ "ccm.load", "https://ccmjs.github.io/akless-components/modules/versions/helper-6.0.0.mjs" ],
      "html": [ "ccm.load", "https://akless.github.io/vokabeltrainer/builder/resources/templates.mjs" ],
      "ignore": {
        "css": {
          "default": {
            "key": "default",
            "title": "Default",
            "value": [ "ccm.load", "https://akless.github.io/vokabeltrainer/builder/resources/default.css" ]
          }
        },
        "user": {
          "guest": {
            "key": "guest",
            "title": "Guest Mode",
            "value": [ "ccm.instance", "https://ccmjs.github.io/akless-components/user/versions/ccm.user-9.7.0.js", [ "ccm.get", "https://ccmjs.github.io/akless-components/user/resources/resources.js", "guest" ] ]
          },
          "cloud": {
            "key": "cloud",
            "title": "Digital Makerspace Account",
            "value": [ "ccm.instance", "https://ccmjs.github.io/akless-components/user/versions/ccm.user-9.7.0.js", [ "ccm.get", "https://ccmjs.github.io/akless-components/user/resources/resources.js", "cloud" ] ]
          },
          "hbrsinfkaul": {
            "key": "hbrsinfkaul",
            "title": "H-BRS FB02 Account",
            "value": [ "ccm.instance", "https://ccmjs.github.io/akless-components/user/versions/ccm.user-9.7.0.js", [ "ccm.get", "https://ccmjs.github.io/akless-components/user/resources/resources.js", "hbrsinfkaul" ] ]
          },
          "hbrsinfpseudo": {
            "key": "hbrsinfpseudo",
            "title": "H-BRS FB02 Account with Pseudonym",
            "value": [ "ccm.instance", "https://ccmjs.github.io/akless-components/user/versions/ccm.user-9.7.0.js", [ "ccm.get", "https://ccmjs.github.io/akless-components/user/resources/resources.js", "hbrsinfpseudo" ] ]
          },
          "pseudo": {
            "key": "pseudo",
            "title": "One-time Pseudonym",
            "value": [ "ccm.instance", "https://ccmjs.github.io/akless-components/user/versions/ccm.user-9.7.0.js", [ "ccm.get", "https://ccmjs.github.io/akless-components/user/resources/resources.js", "pseudo" ] ]
          }
        }
      },
      "libs": [ "ccm.load",
        // parallel
        "https://ccmjs.github.io/akless-components/libs/moment/moment.min.js",
        [  // serial
          "https://ccmjs.github.io/akless-components/libs/jquery-3/jquery.min.js",
          "https://ccmjs.github.io/akless-components/libs/bootstrap-4/js/bootstrap.bundle.min.js"
        ]
      ],
      "preview": "Preview",
  //  "onfinish": { "restart": true },
      "results": { "store": { "name": "cloze_results" }, "permissions": { "access": { "get": "all", "set": "creator", "del": "creator" } } },
      "shadow": "none",
      "submit": "Submit",
      "tool": { "config": { "captions": { "finish": "Finish" }, "vocabulary": [] } }
  //  "tool": [ "ccm.component", "https://akless.github.io/vokabeltrainer/trainer/versions/ccm.vocabulary_trainer-1.0.0.js" ]
    },

    Instance: function () {
      let $, dataset, entries = [];

      this.ready = async () => {
        $ = Object.assign( {}, this.ccm.helper, this.helper ); $.use( this.ccm );  // set shortcut to help functions
        delete this.tool.config.parent;                                            // remove no needed parent reference
      };

      this.start = async () => {
        dataset = await $.integrate( await $.dataset( this.data ), this.tool.config );  // get initial app configuration
        this.render( dataset );                                                         // render main HTML template

        // listen to change events of the input fields
        this.element.querySelectorAll( '*[name]' ).forEach( input => input.addEventListener( 'change', () => this.render() ) );

        // set submit event for adding a new vocabulary
        const form = this.element.querySelector( '#vocabulary-form' );
        form.addEventListener( 'submit', event => {
          event.preventDefault();
          const entry = {
            key: entries.length + 1,
            word: this.element.querySelector( '#word-input' ).value,
            translation: this.element.querySelector( '#translation-input' ).value,
            created_at: Date.now()
          }
          entries.push( entry );
          jQuery( '#vocabulary-modal' ).modal( 'hide' );  // close modal dialog
          form.reset();
          this.render();
        } );

        // update app preview in modal dialog
        jQuery( '#cb-preview' ).on( 'show.bs.modal', () => this.tool.start( Object.assign( this.getValue(), { root: this.element.querySelector( '#cb-preview-body' ) } ) ) );

        // listen to submit event of the HTML form
        this.submit && this.element.querySelector( 'form' ).addEventListener( 'submit', event => {
          event.preventDefault();
          const result_data = this.getValue();            // get result data
          debugger;
          $.onFinish( this, result_data );                // trigger finish actions
        } );
      };

      /**
       * renders the main HTML template
       * @param {Object} [config = this.getValue()] - app configuration
       */
      this.render = ( config = this.getValue() ) => {
        $.render( $.html( this.html.main, config, this ), this.element );
      }

      /**
       * returns current result data
       * @returns {Object} app configuration
       */
      this.getValue = () => {
        const config = $.formData( this.element );
        config.vocabulary = entries;
        config.css = this.ignore.css[ config.css ].value;
        if ( !config.finish ) config.onfinish = ''; delete config.finish;
        if ( !config.onfinish ) {
          delete config.app;
          delete config.render;
          delete config.store;
          return config;
        }
        const key = this.results.key || dataset.key || $.generateKey();
        switch ( config.store ) {
          case 'collective': config.onfinish.store = true; config.data = { store: [ 'ccm.store', this.results.store ], key: key }; break;
          case 'user': config.onfinish.store = true; config.data = { store: [ 'ccm.store', this.results.store ], key: key, login: true, user: true, permissions: this.results.permissions }; break;
          case 'unique': config.onfinish.login = true; config.onfinish.store = { settings: [ 'ccm.store', this.results.store ], key: key, login: true, user: true, unique: true, permissions: this.results.permissions }; config.data = ''; break;
          default: config.data = '';
        }
        if ( !config.store || config.store === 'collective' ) config.user = '';
        config.store = '';
        if ( config.user ) config.user = this.ignore.user[ config.user ].value;
        switch ( config.render ) {
          case 'clear': config.onfinish.clear = true; break;
          case 'restart': config.onfinish.restart = true; break;
          case 'app':
            config.onfinish.render = {};
            if ( config.app ) {
              config.onfinish.render = $.decomposeEmbedCode( config.app );
              config.onfinish.render.config = [ 'ccm.get', config.onfinish.render.config.store, config.onfinish.render.config.key ];
            }
            break;
        }
        delete config.render;
        delete config.app;
        return config;
      };
    }
  };

  let b="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[b])return window.ccm.files[b]=component;(b=window.ccm&&window.ccm.components[component.name])&&b.ccm&&(component.ccm=b.ccm);"string"===typeof component.ccm&&(component.ccm={url:component.ccm});let c=(component.ccm.url.match(/(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)/)||[""])[0];if(window.ccm&&window.ccm[c])window.ccm[c].component(component);else{var a=document.createElement("script");document.head.appendChild(a);component.ccm.integrity&&a.setAttribute("integrity",component.ccm.integrity);component.ccm.crossorigin&&a.setAttribute("crossorigin",component.ccm.crossorigin);a.onload=function(){(c="latest"?window.ccm:window.ccm[c]).component(component);document.head.removeChild(a)};a.src=component.ccm.url}
} )();