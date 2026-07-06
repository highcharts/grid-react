import { useState, useRef } from 'react';
import {
  type GridInstance,
  type GridRefHandle,
  type GridOptions,
  Grid,
  Caption,
  Data,
  DataTable,
  ColumnDefaults,
  Column,
  Description,
  Pagination
} from '@highcharts/grid-lite-react';

function App() {
  const grid = useRef<GridRefHandle<GridOptions> | null>(null);

  // ==== OPTIONS ====
  // const [options] = useState<GridOptions>({
  //   dataTable: {
  //     columns: {
  //       name: ['1111Alice', 'Bob', 'Charlie', 'David', 'Eve'],
  //       age: [23, 34, 45, 56, 67],
  //       city: ['New York', 'Oslo', 'Paris', 'Tokyo', 'London'],
  //       salary: [50000, 60000, 70000, 80000, 90000]
  //     }
  //   }
  // });

  // ==== DATA ====
  // Data Columns
  const [dataSource, setDataSource] = useState({
    name: ['COLUMNS', 'Bob', 'Charlie', 'David', 'Eve'],
    age: [23, 34, 45, 56, 67],
    city: ['New York', 'Oslo', 'Paris', 'Tokyo', 'London'],
    salary: [50000, 60000, 70000, 80000, 90000]
  });

  // Data Table
  // const dataTable = new DataTable({
  //   columns: {
  //     name: ['DATATABLE', 'Bob', 'Charlie', 'David', 'Eve'],
  //     age: [23, 34, 45, 56, 67],
  //     city: ['New York', 'Oslo', 'Paris', 'Tokyo', 'London'],
  //     salary: [50000, 60000, 70000, 80000, 90000]
  //   }
  // });

  // ==== ACTIONS ====
  const onButtonClick = () => {
    // console.info('(ref) grid:', grid.current?.grid);
    setDataSource({
      name: ['John', 'Jane', 'Jim', 'Jill', 'Jack'],
      age: [30, 25, 35, 40, 45],
      city: ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Miami'],
      salary: [40000, 35000, 45000, 50000, 55000]
    });
  };

  const onGridCallback = (grid: GridInstance<GridOptions>) => {
    console.info('(callback) grid:', grid);
  };

  // Pagination
  // const [paginationEnabled, setPaginationEnabled] = useState(false);

  // const onPaginationClick = () => {
  //   setPaginationEnabled(true);
  // };

  return (
    <>
      <Grid
        // options={options}
        // gridRef={grid}
        callback={onGridCallback}
      >
        <Data
          // dataTable={dataTable}
          columns={dataSource}
        />
        <ColumnDefaults
          dataType="string"
          width="auto"
          exportable
          style={{ fontWeight: '400' }}
          sortingEnabled
          sortingOrderSequence={['asc', 'desc', null]}
          filteringEnabled
          filteringInline={true}
          filteringCondition="contains"
          filteringValue=""
          headerClassName="hcg-default-header"
          headerFormat="{id}"
          cellClassName="hcg-default-cell"
          cellFormat="{value}"
          cellRowHeader={false}
        />
        <Caption>Grid Caption v2.1</Caption>
        <Column
          headerFormat="#"
          width={40}
          cellValueGetter={function (this: { row: { index: number } }) {
            return String(this.row.index + 1);
          }}
        />
        <Column
          columnId="name"
          className="hcg-name-column"
          enabled
          sortingEnabled
          sortingOrder="asc"
          sortingPriority={0}
          // filteringEnabled
          // filteringInline
          // filteringCondition="contains"
          headerClassName="hcg-name-header"
          headerFormat="Name"
          cellClassName="hcg-name-cell"
          cellFormat="{value}"
        />
        <Column
          columnId="age"
          dataType="number"
          headerFormat="Age ({id})"
          cellFormat="{value}"
        />
        <Column
          columnId="city"
          width="20%"
          headerFormatter={function () {
            return `City: ${(this as { id?: string }).id ?? ''}`;
          }}
        />
        <Column
          columnId="salary"
          dataType="number"
          headerFormat="Salary (USD)"
          cellFormat="${value}"
        />
        <Description>Grid Description</Description>
        <Pagination
          // enabled={paginationEnabled}
          page={1}
          pageSize={3}
          align="right"
          // pageInfo
          // pageSizeSelector
          pageSizeOptions={[3, 5, 10, 25]}
          // pageButtons
          pageButtonsCount={5}
          // firstLast
          // previousNext
        />
      </Grid>
      <div id="controls">
        <button onClick={onButtonClick}>Data state</button>
        {/* <button onClick={onPaginationClick}>Pagination</button> */}
      </div>
    </>
  );
}

export default App;
