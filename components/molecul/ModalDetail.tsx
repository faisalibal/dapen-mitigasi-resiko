import { useAppDispatch, useAppSelector } from '@/hook/ReduxHook';
import useOnClickOutside from '@/hook/useOnClickOutside';
import { modalDetailFalse } from '@/redux/ViewConfiguration';
import React, { useRef } from 'react';

const ModalDetail = () => {
  const bodyRef = useRef<HTMLDivElement>(null);
  const { detail } = useAppSelector((state) => ({ ...state.viewConfig }));
  const dispatch = useAppDispatch();

  useOnClickOutside(bodyRef, () => dispatch(modalDetailFalse()));
  return (
    <div className="w-[100vw] h-[100vh] fixed top-0 left-0 bg-black bg-opacity-80 grid place-items-center z-[1000]">
      <div
        className="w-[40vw] h-[75vh] bg-gray-300 rounded-md p-5 flex flex-col gap-2 overflow-y-auto"
        ref={bodyRef}
      >
        <span className="flex flex-col w-full gap-0">
          <h5 className="font-semibold">No: {detail?.id}</h5>
          <p className="font-semibold">Line No: {detail?.line_no}</p>
        </span>
        <span className="flex flex-col w-full gap-2">
          <p className="font-semibold">Pemilik risiko:</p>
          <p className="-mt-[6px]">{detail?.pemilik_resiko}</p>
        </span>
        <span className="flex flex-col w-full gap-2">
          <p className="font-semibold">Objective:</p>
          <p className="-mt-[6px]">{detail?.objective}</p>
        </span>
        <span className="flex flex-col w-full gap-2">
          <p className="font-semibold">Risk Kategory:</p>
          <p className="-mt-[6px]">{detail?.kategori}</p>
        </span>
        <span className="flex flex-col w-full gap-2">
          <p className="font-semibold">Kode Risiko:</p>
          <p className="-mt-[6px]">{detail?.id_resiko}</p>
        </span>
        <span className="flex flex-col w-full gap-2">
          <p className="font-semibold">PIC Risiko:</p>
          <p className="-mt-[6px]">{detail?.pic_resiko}</p>
        </span>
        <span className="flex flex-col w-full gap-2">
          <p className="font-semibold">Risk Event:</p>
          <p className="-mt-[6px]">{detail?.risk_event}</p>
        </span>
        <span className="flex flex-col w-full gap-0">
          <p className="font-semibold mb-2">Risk Cause:</p>
          <div className="flex flex-col gap-2 pl-4">
            {detail?.penyebab.map((item, index) => (
              <span key={index} className="flex gap-2 items-start">
                <p className="-mt-1">-</p>
                <p className="-mt-[6px]" key={index}>
                  {item}
                </p>
              </span>
            ))}
          </div>
        </span>
        <span className="flex flex-col w-full gap-2">
          <p className="font-semibold">Potensi Kerugian Qualitative:</p>
          <p className="-mt-[6px]">{detail?.akibat_qualitative}</p>
        </span>
        <span className="flex flex-col w-full gap-2">
          <p className="font-semibold">Potensi Kerugian Rp:</p>
          <p className="-mt-[6px]">
            {detail?.akibat_rp !== 0 ? detail?.akibat_rp : '---'}
          </p>
        </span>
        <span className="flex flex-col w-full gap-2">
          <p className="font-semibold">Nama Fungsi Terkait:</p>
          <p className="-mt-[6px]">{detail?.nama_fungsi}</p>
        </span>
        <div className="flex justify-between">
          <span className="flex flex-col w-full gap-2">
            <p className="font-semibold">Nilai Inherent:</p>
            <p className="-mt-[6px] pl-4">
              - Probabilitas: {detail?.prob_inherent}
            </p>
            <p className="-mt-[6px] pl-4">
              - Dampak: {detail?.dampak_inherent}
            </p>
            <p className="-mt-[6px] pl-4">
              - Level of Risk: {detail?.level_of_risk_inherent}
            </p>
          </span>
          <span className="flex flex-col w-full gap-2">
            <p className="font-semibold">Nilai Inherent Tahun Lalu:</p>
            <p className="-mt-[6px] pl-4">
              - Probabilitas:{' '}
              {detail?.prob_inherent_thn_lalu
                ? detail?.prob_inherent_thn_lalu
                : '---'}
            </p>
            <p className="-mt-[6px] pl-4">
              - Dampak:{' '}
              {detail?.dampak_inherent_thn_lalu
                ? detail?.dampak_inherent_thn_lalu
                : '---'}
            </p>
            <p className="-mt-[6px] pl-4">
              - Level of Risk:{' '}
              {detail?.level_of_risk_inherent_thn_lalu
                ? detail?.level_of_risk_inherent_thn_lalu
                : '---'}
            </p>
          </span>
        </div>
        <div className="flex justify-between">
          <span className="flex flex-col w-full gap-2">
            <p className="font-semibold">Nilai Mitigasi:</p>
            <p className="-mt-[6px] pl-4">
              - Probabilitas: {detail?.prob_mitigasi}
            </p>
            <p className="-mt-[6px] pl-4">
              - Dampak: {detail?.dampak_mitigasi}
            </p>
            <p className="-mt-[6px] pl-4">
              - Level of Risk: {detail?.level_of_risk_mitigasi}
            </p>
          </span>
          <span className="flex flex-col w-full gap-2">
            <p className="font-semibold">Nilai Mitigasi Tahun Lalu:</p>
            <p className="-mt-[6px] pl-4">
              - Probabilitas:{' '}
              {detail?.prob_mitigasi_thn_lalu
                ? detail?.prob_mitigasi_thn_lalu
                : '---'}
            </p>
            <p className="-mt-[6px] pl-4">
              - Dampak:{' '}
              {detail?.dampak_mitigasi_thn_lalu
                ? detail?.dampak_mitigasi_thn_lalu
                : '---'}
            </p>
            <p className="-mt-[6px] pl-4">
              - Level of Risk:{' '}
              {detail?.level_of_risk_mitigasi_thn_lalu
                ? detail?.level_of_risk_mitigasi_thn_lalu
                : '---'}
            </p>
          </span>
        </div>
        <span className="flex flex-col w-full gap-0">
          <p className="font-semibold mb-2">Treatment:</p>
          <div className="flex flex-col gap-2 pl-4">
            {detail?.treatment.map((item, index) => (
              <span key={index} className="flex gap-2 items-start">
                <p className="-mt-1">-</p>
                <p className="-mt-[6px]" key={index}>
                  {item}
                </p>
              </span>
            ))}
          </div>
        </span>
      </div>
    </div>
  );
};

export default ModalDetail;
