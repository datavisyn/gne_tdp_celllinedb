from tdp_core.dbview import DBViewBuilder, DBConnector, add_common_queries, inject_where, DBMapping

idtype = 'GNECellline' # idtype of our rows

columns = ['tissuediagnosis', 'primarytissue', 'celllinename', 'age', 'gender', 'species', 'canonicalname', 'ccle_name']

# main dictionary containing all views registered for this plugin
views = dict()

views['celllines_by_id'] = DBViewBuilder().idtype(idtype).table('sinfo') \
  .query("""SELECT d.clid as id, d.* FROM sinfo d WHERE d.clid IN {ids}""") \
  .replace('ids') \
  .derive_columns() \
  .column('tissue', type='categorical') \
  .column('primarytissue', type='categorical') \
  .column('primarytissuemetaclass', type='categorical') \
  .column('tissuediagnosis', type='categorical') \
  .column('tissuediagnosismetaclass', type='categorical') \
  .column('gender', type='categorical') \
  .column('species', type='categorical') \
  .column('ethnicity', type='categorical') \
  .column('msi_status', type='categorical') \
  .assign_ids() \
  .call(inject_where) \
  .build()

views['celllines'] = DBViewBuilder().idtype(idtype).table('sinfo') \
  .query("""SELECT d.clid as id, d.* FROM sinfo d """) \
  .derive_columns() \
  .column('tissue', type='categorical') \
  .column('primarytissue', type='categorical') \
  .column('primarytissuemetaclass', type='categorical') \
  .column('tissuediagnosis', type='categorical') \
  .column('tissuediagnosismetaclass', type='categorical') \
  .column('gender', type='categorical') \
  .column('species', type='categorical') \
  .column('ethnicity', type='categorical') \
  .column('msi_status', type='categorical') \
  .assign_ids() \
  .call(inject_where) \
  .build()
  # .column('morphology' type='categorical') \
  # .column('pam_subtype' type='categorical') \
  # .column('has_rnaseq' type='categorical') \
  # .column('has_snparray' type='categorical') \
  # .column('has_wes' type='categorical') \

views['expression_score'] = DBViewBuilder().idtype(idtype) \
  .query("""SELECT clid as id, nrpkm as score FROM genomics WHERE gene_id = :ensg """) \
  .arg('ensg') \
  .call(inject_where) \
  .build()


# notes:
# by convention the 'id' column contains the identifier column of a row
# derive_columns ... try to automatically derive column and column types
# column(column, attrs) ... explicitly set a column type
# assign_ids ... the tdp server should automatically manage and assign unique integer ids based on the 'id' column
# .call(inject_where) ... utility to inject a where clause that is used for dynamic filtering

# create a set of common queries
add_common_queries(views, 'sinfo', idtype, 'clid as id', columns)


def create():
  """
  factory method to build this extension
  :return:
  """
  connector = DBConnector(views)
  connector.description = 'sample connector to the celllinedb database'
  return connector
