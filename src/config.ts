import {ICommonDBConfig} from 'tdp_gene/src/views/ACommonList';
import {IAdditionalColumnDesc, stringCol, categoricalCol, numberCol} from 'tdp_core/src/lineup';
import {IServerColumn} from 'tdp_core/src/rest';

export interface IDataSourceConfig extends ICommonDBConfig {
    columns(find: (column: string) => IServerColumn): IAdditionalColumnDesc[];
}

export const gneCellline: IDataSourceConfig = {
    idType: 'GNECellline',
    name: 'gne_cellline',
    db: 'celllinedb',
    base: 'celllines',
    entityName: 'celllinename',
    tableName: 'sinfo',
    columns: (find: (column: string) => IServerColumn) => {
        return [
            stringCol('canonicalname'),
            stringCol('clid'),
            stringCol('celllinename'),
            stringCol('ccle_name'),
            numberCol('age', 0, find('age').max),
            categoricalCol('ethnicity', find('ethnicity').categories),
            categoricalCol('gender', find('gender').categories),
            categoricalCol('primarytissue', find('primarytissue').categories),
            categoricalCol('tissuediagnosis', find('tissuediagnosis').categories),
            categoricalCol('msi_status', find('msi_status').categories),
            // categoricalCol('morphology', find('morphology').categories),
            // categoricalCol('pam_subtype', find('pam_subtype').categories),
            // categoricalCol('has_rnaseq', find('has_rnaseq').categories),
            // categoricalCol('has_snparray', find('has_snparray').categories),
            // categoricalCol('has_wes', find('has_wes').categories),
            numberCol('mutation_load', 0, find('mutation_load').max),
            numberCol('ploidy', 0, find('ploidy').max),
        ];
    }
};


