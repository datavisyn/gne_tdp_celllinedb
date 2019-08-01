import {AView} from 'tdp_core/src/views/AView';
import {getTDPData} from 'tdp_core/src/rest';
import {gneCellline} from '../config';

export default class DetailTable extends AView {

  protected initImpl() {
    super.initImpl();
    return this.build();
  }

  protected selectionChanged() {
    super.selectionChanged();
    this.build();
  }

  private build() {
    return this.resolveSelection().then((idsFromTDP) => {
      const idsAsString = `(${idsFromTDP.map((s) => `'${s}'`).join(',')})`;
      getTDPData(gneCellline.db,'celllines_by_id', {ids: idsAsString}).then((res) => {
        return this.node.innerHTML = `${res}`;
      });
    });
  }
}
