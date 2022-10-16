import React, { useEffect, useState } from 'react';
import Modal from 'components/Modal';
import AddFocusAreas from './components/AddMembers';
import BaseTable from '../../components/base/base-table';
import focusAreasService, { getAll } from '../../services/members';
import useFetchAndLoad from '../../hooks/useFetchAndLoad';
import { useNavigate } from "react-router-dom";
import { Img } from '@chakra-ui/react';
import LogoBonum from 'assets/images/logo.png';
import { CSVLink } from "react-csv"

import './Members.scss';
import { Button } from 'antd';
function Coachees() {
  const [modal, setModal] = useState(false);
  const onClose = () => setModal(false);

  const router = useNavigate();

  const { loading, callEndpoint } = useFetchAndLoad()

  const [data, setData] = useState([]);

  const getData = async () => {
    const { data } = await callEndpoint(getAll());
    setData(data.data);
  }

  useEffect(() => {
    getData();
  }, []);

  const columns = [
    {
      title: 'Correo',
      dataIndex: 'email',
      width: '20%',
      editable: true,
      searchable: true,
    },
    {
      title: 'estado',
      dataIndex: 'estado',
      width: '20%',
      render: state => state ? 'Activo' : 'Inactivo'
    }
  ]

  return (
    <div className="focusAreas">
      <CSVLink
        filename={"Members.csv"}
        data={data}
        className="btn btn-primary"
        onClick={() => { }}
      >
        Export to CSV
      </CSVLink>
      <h2 className="flex justify-center">Members</h2>
      <div className="focusAreas__content Content">
        <BaseTable
          loading={loading}
          originData={data}
          onChange={console.log}
          columns={columns}
          addTitle={""}
          service={focusAreasService} />
      </div>
    </div>
  );
}

export default Coachees;