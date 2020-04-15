/*
 * Copyright 2020 Spotify AB
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React, { FC } from 'react';
import { Progress } from '@backstage/core';
import { useAsync } from 'react-use';
import Alert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  avatar: {
    height: 32,
    width: 32,
    borderRadius: '50%',
  },
});

type currencyData = {
  rates: Map<string, number>;
};

const DenseTable: FC<currencyData> = rates => {
  const classes = useStyles();

  return (
    <TableContainer>
      <Table className={classes.table} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Currency</TableCell>
            <TableCell>Exchange</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Object.entries(rates.rates).map(elem => (
            <TableRow key={elem[0]}>
              <TableCell>{elem[0]}</TableCell>
              <TableCell>{elem[1]}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

const CurrencyComponent: FC<{}> = () => {
  const { value, loading, error } = useAsync(async (): Promise<
    Map<string, number>
  > => {
    const response = await fetch('https://api.exchangeratesapi.io/latest');
    const data = await response.json();
    return data.rates;
  }, []);

  if (loading) {
    return <Progress />;
  } else if (error) {
    return <Alert severity="error">{error.message}</Alert>;
  }

  const empty: Map<string, number> = new Map<string, number>();

  return <DenseTable rates={value || empty} />;
};

export default CurrencyComponent;
