import {IScore, IScoreRow} from 'tdp_core/src/extensions';
import {resolve} from 'phovea_core/src/idtype';
import {numberCol} from 'tdp_core/src/lineup';
import {nameLookupDesc, FormDialog} from 'tdp_core/src/form';
import {getTDPScore} from 'tdp_core/src/rest';
import {gene} from 'tdp_publicdb/src/config';
import {gneCellline} from '../config';

/**
 * interface describing the parameter needed for MyScore
 */
export interface IExpressionScoreParam {
  ensg: {text: string, id: string};
}

/**
 * score implementation in this case a numeric score is computed
 */
export default class ExpressionScore implements IScore<number> {

  /**
   * defines the IDType of which score values are returned. A score row is a pair of id and its score, e.g. {id: 'EGFR', score: 100}
   * @type {IDType}
   */
  readonly idType = resolve('GNECellline');

  constructor(private readonly params: IExpressionScoreParam) {

  }

  /**
   * creates the column description used within LineUp to create the oclumn
   * @returns {IAdditionalColumnDesc}
   */
  createDesc() {
    const label = `Expression of ${this.params.ensg.text}`;
    return numberCol('', 0, 100, {label});
  }

  /**
   * computes the actual scores and returns a Promise of IScoreRow rows
   * @returns {Promise<IScoreRow<number>[]>}
   */
  compute(): Promise<IScoreRow<number>[]> {
    return getTDPScore(gneCellline.db, `expression_score`, {
      ensg: this.params.ensg.id
    });
  }
}

/**
 * builter function for building the parameters of the MyScore
 * @returns {Promise<IExpressionScoreParam>} a promise for the parameter
 */
export function create() {
  /**
   * a formDialog is a modal dialog showing a form to the user. The first argument is the dialog title, the second the label of the submit button
   * @type {FormDialog}
   */
  const dialog = new FormDialog('Add Expression Score', 'Add Score');

  const FORM_ID = 'geneLookup';

  dialog.append(nameLookupDesc(gene.db, gene.tableName, {
    column: 'symbol',
    formID: FORM_ID,
    label: 'Choose a gene',
    params: {
      species: 'human'
    }
  }));

  return dialog.showAsPromise((r) => {
    // retrieve the entered values, each one identified by its formID
    const data = r.getElementValues();
    return <IExpressionScoreParam>{
      ensg: data[FORM_ID]
    };
  });
}
