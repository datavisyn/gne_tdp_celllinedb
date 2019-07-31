import ACommonList, {IACommonListOptions} from 'tdp_gene/src/views/ACommonList';
import {IViewContext, ISelection} from 'tdp_core/src/views';
import {gneCellline} from '../config';

export default class GNECelllineList extends ACommonList {

  constructor(context: IViewContext, selection: ISelection, parent: HTMLElement, options: IACommonListOptions) {
    super(context, selection, parent, gneCellline, options);
  }

}
