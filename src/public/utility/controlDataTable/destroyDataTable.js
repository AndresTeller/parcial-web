export const destroyDataTable = (dataTable, dataTableIsInitialized) => {
  if (dataTableIsInitialized) {
    dataTable.destroy();
  }
};