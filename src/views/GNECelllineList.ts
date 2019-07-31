import ACommonList, {IACommonListOptions} from 'tdp_gene/src/views/ACommonList';
import {IViewContext, ISelection} from 'tdp_core/src/views';
import {gneCellline} from '../config';
import {IServerColumn} from 'tdp_core/src/rest';

export default class GNECelllineList extends ACommonList {

  constructor(context: IViewContext, selection: ISelection, parent: HTMLElement, options: IACommonListOptions) {
    super(context, selection, parent, gneCellline, options);
  }

  protected getColumnDescs(columns: IServerColumn[]) {
    const descs = gneCellline.columns((column) => columns.find((d) => d.column === column));
    console.log(descs);
    return descs;
    // return gneCellline.columns(function(column) {
    //   return columns.find(function(d) {
    //     return d.column === column;
    //   });
    // });
  }

}
