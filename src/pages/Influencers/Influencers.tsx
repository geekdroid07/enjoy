import React, { useEffect, useState } from 'react';
import Modal from 'components/Modal';
import AddFocusAreas from './components/AddInfluencers';
import BaseTable from '../../components/base/base-table';
import focusAreasService, { getAll } from '../../services/admin.service';
import useFetchAndLoad from '../../hooks/useFetchAndLoad';
import { useNavigate } from "react-router-dom";
import { Img } from '@chakra-ui/react';
import LogoBonum from 'assets/images/logo.png';
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
      title: 'Nombre',
      dataIndex: 'focusArea',
      width: '15%',
      editable: true,
      searchable: true,
    },
    {
      title: 'Estado',
      dataIndex: 'statusArea',
      width: '10%',
      type: 'boolean',
      editable: true
    },
    {
      title: 'Imagen',
      dataIndex: 'urlImgFocusArea',
      ellipsis: true,

      render: urlImgFocusArea => <Img className="focusareaImg" src={urlImgFocusArea ? urlImgFocusArea : LogoBonum} />,
      width: '10%',
      editable: true
    }
  ]

  return (
    <div className="focusAreas">
      <Modal
        isOpen={modal}
        onClose={onClose}
        content={<AddFocusAreas />}
        title="Añadir Focus Area"
      />
      <h2 className="flex justify-center">Influencers</h2>
      <div className="focusAreas__content Content">
        <BaseTable
          loading={loading}
          originData={data}
          columns={columns}
          actions={{
            view: (id) => router(`/focusareas/view/${id}`),
            add: () => router('/focusareas/add'),
            edit: (id) => router(`/focusareas/edit/${id}`),
          }}
          addTitle={"Add Focus Area"}
          service={focusAreasService} />
      </div>
    </div>
  );
}

export default Coachees;