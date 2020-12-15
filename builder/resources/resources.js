/**
 * @overview data-based resources of ccm component for building a vocabulary trainer
 * @author André Kless <andre.kless@web.de> 2020
 * @license The MIT License (MIT)
 */

ccm.files[ 'resources.js' ] = {

  "local": {
    "css": [ "ccm.load",
      [  // serial
        "https://ccmjs.github.io/akless-components/libs/bootstrap-4/css/bootstrap.min.css",
        "./resources/default.css"
      ]
    ],
    "data": {
      "store": [ "ccm.store", { "url": "https://ccm2.inf.h-brs.de", "name": "vocabulary_trainer" } ],
      "key": "test"
    },
    "html.1": "./resources/templates.mjs",
    "onfinish": { "log": true, "store": true },
    "preview": "",
//  "tool": [ "ccm.component", "./../trainer/ccm.vocabulary_trainer.js", [ "ccm.get", "./../trainer/resources/resources.js", "local" ] ]
  },

  "demo": {}

};