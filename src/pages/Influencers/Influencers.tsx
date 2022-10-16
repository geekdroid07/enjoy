import React, { useEffect, useState } from 'react';
import Modal from 'components/Modal';
import AddFocusAreas from './components/AddInfluencers';
import BaseTable from '../../components/base/base-table';
import influencersService, { getAll, MEMBERSHIP } from '../../services/influencers';
import useFetchAndLoad from '../../hooks/useFetchAndLoad';
import { useNavigate } from "react-router-dom";
import { Img } from '@chakra-ui/react';
import LogoBonum from 'assets/images/logo.png';
import { CSVLink } from "react-csv"
import './Influencers.scss';

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
      title: 'Monto',
      dataIndex: 'amount',
      width: '20%',
      render: (text, data) => {
        let total = 0;
        const activeMembers = data.Miembros.filter(x => x.estado)
        for (const member of activeMembers) {
          total += MEMBERSHIP
        }
        return total / 2
      },
    }
  ]
  return (
    <div className="focusAreas">
      <CSVLink
        filename={"Influencers.csv"}
        data={data}
        className="btn btn-primary"
        onClick={() => { }}
      >
        Export to CSV
      </CSVLink>
      <h2 className="flex justify-center">Influencers</h2>
      <div className="focusAreas__content Content">
        <BaseTable
          loading={loading}
          originData={data}
          onChange={console.log}
          columns={columns}
          addTitle={""}
          service={influencersService} />
      </div>
    </div>
  );
}

export default Coachees;