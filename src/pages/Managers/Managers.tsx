import React, { useEffect, useState } from 'react';
import Modal from 'components/Modal';
import AddFocusAreas from './components/AddManagers';
import BaseTable from '../../components/base/base-table';
import managersService, { getAll } from '../../services/managers';
import useFetchAndLoad from '../../hooks/useFetchAndLoad';
import { useNavigate } from "react-router-dom";
import { Img } from '@chakra-ui/react';
import LogoBonum from 'assets/images/logo.png';
import { CSVLink } from "react-csv"
import './Managers.scss';
import { MEMBERSHIP } from 'services/influencers';
function Managers() {
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

  const calcMembers = members => {
    let total = 0;
    const activeMembers = members.filter(x => x.estado)
    for (const member of activeMembers) {
      total += MEMBERSHIP
    }
    return total / 2
  }

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
        for (const influencer of data.Influencers) {
          const membersCalc: number = calcMembers(influencer.Miembros)
          total += membersCalc * 0.15;
        }

        return total
      },
    }
  ]

  return (
    <div className="focusAreas">
      <CSVLink
        filename={"Managers.csv"}
        data={data}
        className="btn btn-primary"
        onClick={() => { }}
      >
        Export to CSV
      </CSVLink>
      <h2 className="flex justify-center">Managers</h2>
      <div className="focusAreas__content Content">
        <BaseTable
          loading={loading}
          onChange={console.log}
          originData={data}
          columns={columns}
          addTitle={""}
          service={managersService} />
      </div>
    </div>
  );
}

export default Managers;