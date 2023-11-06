export const visuallyHidden = {
  border: 0,
  margin: -1,
  padding: 0,
  width: '1px',
  height: '1px',
  overflow: 'hidden',
  position: 'absolute',
  whiteSpace: 'nowrap',
  clip: 'rect(0 0 0 0)',
};

export function emptyRows(page: number, rowsPerPage: number, arrayLength: number) {
  return page ? Math.max(0, (1 + page) * rowsPerPage - arrayLength) : 0;
}

function descendingComparator(a: { [x: string]: number; }, b: { [x: string]: number; }, orderBy: string) {
  if (a[orderBy] === null) {
    return 1;
  }
  if (b[orderBy] === null) {
    return -1;
  }
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}
export function getComparator(order: string, orderBy: string) {
  return order === 'desc'
    ? (a: { [x: string]: number; }, b: { [x: string]: number; }) => descendingComparator(a, b, orderBy)
    : (a: { [x: string]: number; }, b: { [x: string]: number; }) => -descendingComparator(a, b, orderBy);
}

// TODO: remove any and add proper types
export function applyFilter({ inputData, comparator, filterName }: any) {
  const stabilizedThis = inputData.map((el: any, index: any) => [el, index]);

  stabilizedThis.sort((a: number[], b: number[]) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  inputData = stabilizedThis.map((el: any[]) => el[0]);

  if (filterName) {
    inputData = inputData.filter(
      (user: { name: string; }) => user.name.toLowerCase().indexOf(filterName.toLowerCase()) !== -1
    );
  }

  return inputData;
}
