
import {ACommonSubSection} from 'tdp_gene/src/menu/ACommonSubSection';
import {IStartMenuSubSectionDesc, IStartMenuSectionOptions} from 'tdp_gene/src/extensions';
import {gneCellline} from '../config';


export default class GNECellLineSubSection extends ACommonSubSection {

  constructor(parent: HTMLElement, desc: IStartMenuSubSectionDesc, options: IStartMenuSectionOptions) {
    super(parent, desc, gneCellline, options);
  }

}
