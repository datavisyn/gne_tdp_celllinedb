/* *****************************************************************************
 * Caleydo - Visualization for Molecular Biology - http://caleydo.org
 * Copyright (c) The Caleydo Team. All rights reserved.
 * Licensed under the new BSD license, available at http://caleydo.org/license
 **************************************************************************** */

//register all extensions in the registry following the given pattern
module.exports = function (registry) {
  /// #if include('extension-type', 'extension-id')	
  //registry.push('extension-type', 'extension-id', function() { return import('./src/extension_impl'); }, {});
  /// #endif
  // generator-phovea:begin



  registry.push('ordinoStartMenuSubSection', 'gne_cellline_start', function () {return import('./src/menu/GNECellLineSubSection');}, {
    'name': 'GNE Cell Line',
    'description': 'GNE Cell Line Panel',
    'viewId': 'gne_cellline_list',
    'idType': 'GNECellline',
    'selection': 'none',
    'cssClass': 'gne-cellline-entry-point'
  });


  registry.push('tdpView', 'gne_cellline_list', function () {return import('./src/views/GNECelllineList');}, {
    'name': 'GNE Cell Line',
    'idType': 'GNECellline',
    'selection': 'none'
  });


  registry.push('tdpScore', 'expression_score', function () {return import('./src/scores/ExpressionScore');}, {
    'name': 'Expression Score',
    'idtype': 'GNECellline'
  });


  registry.push('tdpScoreImpl', 'expression_score', function () {return import('./src/scores/ExpressionScore');}, {
    'factory': 'new'
  });


  registry.push('tdpView', 'gne_cellcentral_proxy', function () {return import('./src/views/CellCentralProxy');}, {
    'name': 'CellCentral',
    'idType': 'GNECellline',
    'selection': 'chooser',
    'site': '//research.gene.com/cellcentral/#/cellline/{clid}',
    'argument': 'clid',
    'openExternally': true,
    'factory': 'new',
    'group': {
      'name': 'GNE Resources',
      // 'order': 0
    }
  });

  registry.push('tdpView', 'gne_genehub_proxy', function () {return import('./src/views/GeneHubProxy');}, {
    'name': 'GeneHub',
    'idType': 'Ensembl',
    'selection': 'chooser',
    'site': '//research.gene.com/genehub/#/summary/gene/{ensg}/human',
    'argument': 'ensg',
    'openExternally': false,
    'factory': 'new',
    'group': {
      'name': 'GNE Resources',
      // 'order': 0
    }
  });


  registry.push('tdpView', 'detail_table', function() { return import('./src/views/DetailTable'); }, {
  'name': 'Detail Table',
  'idType': 'GNECellline',
  'selection': 'multiple',
  'group': {
    'name': 'GNE Resources',
    // 'order': 0
  }
  
 });
  // generator-phovea:end
};

