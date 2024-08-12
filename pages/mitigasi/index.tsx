import { DepartmentDTO, ResikoMitigasiDTO } from '@/DTO/RiskDTO';
import ModalDetail from '@/components/molecul/ModalDetail';
import { baseURL } from '@/config/axios';
import { useAppSelector } from '@/hook/ReduxHook';
import { colorBox, colorCircle } from '@/utils/ColorCircle';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import dpp from '../../public/dpp.png';
import andal from '../../public/andal.png';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import {
  ChartLabelProbabilitas,
  ChartOption,
  LegendLevelResiko,
} from '@/utils/ChartOptions';
import LoadingSpinner from '@/components/molecul/LoadingSpinner';
import dynamic from 'next/dynamic';
const ChartMitigasi = dynamic(
  () => import('@/components/molecul/ChartMitigasi'),
  { ssr: false }
);
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { ToastContainer, toast, Flip } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Mitigasi = () => {
  const router = useRouter();
  const path = router.asPath.split('/')[1];
  const { modalDetail } = useAppSelector((state) => ({ ...state.viewConfig }));
  const [filterAktif, setFilterAktif] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [dataInherent, setDataInherent] = useState<ResikoMitigasiDTO[]>();
  const [dataRisiko, setDataRisiko] = useState<ResikoMitigasiDTO[]>();
  const [dataDepartment, setDataDepartment] = useState<DepartmentDTO[]>();
  const [selectedYear, setSelectedYear] = useState<dayjs.Dayjs | null>();
  const [year, setYear] = useState<number | null>(null);
  const [fungsiFilter, setFungsiFilter] = useState<boolean>(false);
  const [isPickYear, setIsPickYear] = useState<boolean>(false);
  const [isLegendHover, setIsLegendHover] = useState<string>('');

  const handleYearChange = (year: dayjs.Dayjs | null) => {
    let tahun: number | null = null;
    if (year) {
      tahun = year.year();
    }
    setSelectedYear(year);
    setYear(tahun);
    setIsPickYear(false);
  };

  useEffect(() => {
    const fungsi = localStorage.getItem('fungsi');
    const fungsiFilter = localStorage.getItem('filterFungsi');

    if (router.query.year) {
      localStorage.setItem('year', JSON.stringify(router.query.year));
    }
    if (router.query.fungsi) {
      if (router.query.fungsi === 'null') {
        localStorage.removeItem('fungsi');
        localStorage.removeItem('filterFungsi');
      } else {
        console.log('masuk sini');
        localStorage.setItem('fungsi', JSON.stringify(router.query.fungsi));
        localStorage.setItem('filterFungsi', 'true');
        setFungsiFilter(true);
      }
    }
    if (router.query.session) {
      localStorage.setItem('session', JSON.stringify(router.query.session));
    }

    if (fungsiFilter) {
      setFungsiFilter(true);
      let filter = [...filterAktif];
      if (fungsi) {
        filter.push(fungsi.replace(/"/g, ''));
      }
      setFilterAktif(filter);
    }
    const storageYear = localStorage.getItem('year');

    if (storageYear) {
      const cleanedYear = storageYear.replace(/"/g, '');
      setYear(parseInt(cleanedYear));
      setSelectedYear(dayjs(storageYear));
    }

    if (router.query.fungsi) {
      if (router.query.fungsi === 'null') {
        setFungsiFilter(false);
        setFilterAktif([]);
      } else {
        let filter: any = [];
        if (router.query.fungsi === 'null') {
        } else {
          if (typeof router.query.fungsi === 'string') {
            if (filter.includes(router.query.fungsi)) {
            } else {
              filter.push(router.query.fungsi); // Menambahkan ID jika belum ada dalam filterAktif
            }
          } else if (Array.isArray(router.query.fungsi)) {
            for (const item of router.query.fungsi) {
              if (!filter.includes(item)) {
                filter.push(item); // Menambahkan ID jika belum ada dalam filterAktif
              }
            }
          }
          setFilterAktif(filter);
        }
      }
    }
  }, [router.query]);

  useEffect(() => {
    if (year !== null) {
      const getData = async () => {
        setIsLoading(true);
        try {
          const response = await baseURL.get(
            `/nilaiResikoMitigasi?year=${year}`
          );
          if (response.data.login === false) {
            router.push('/');
          }
          {
            setDataRisiko(response.data.data);

            if (filterAktif.length > 0) {
              const dataItem = response.data.data?.filter((item: any) => {
                return filterAktif.includes(item.KD_FUNGSI);
              });
              setDataInherent(dataItem);
            } else {
              setDataInherent(response.data.data);
            }

            const department = await baseURL.get(`/fungsiResiko?year=${year}`);
            setDataDepartment(department.data.data);
          }
        } catch (error) {
          console.log(error);
        } finally {
          setIsLoading(false);
        }
      };
      getData();
    }
  }, [year, filterAktif]);

  const handleFilterClick = (item: DepartmentDTO) => {
    if (fungsiFilter || item.JUMLAH_REGISTER === '0') {
    } else {
      let filter = [...filterAktif];
      if (filter.includes(item.KD_FUNGSI)) {
        filter = filter.filter((filterId) => filterId !== item.KD_FUNGSI); // Menghapus ID jika sudah ada dalam filterAktif
      } else {
        filter.push(item.KD_FUNGSI); // Menambahkan ID jika belum ada dalam filterAktif
      }

      if (filter.length > 0) {
        const dataItem = dataRisiko?.filter((item) => {
          return filter.includes(item.KD_FUNGSI);
        });
        setDataInherent(dataItem);
      } else {
        setDataInherent(dataRisiko);
      }

      setFilterAktif(filter);
    }
  };

  const notify = (pesan: string) => {
    if (pesan === 'success') {
      toast.success('Succes edit data', {
        position: 'bottom-center',
        autoClose: 800,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        closeButton: false,
      });
    }
    if (pesan === 'remove') {
      toast.warning('Failed edit data', {
        position: 'bottom-center',
        autoClose: 800,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        closeButton: false,
        icon: (
          <span className="bg-red-400 aspect-square rounded-full p-1 grid place-items-center">
            {/* <BsFillTrashFill className="text-white text-sm " /> */}
          </span>
        ),
      });
    }
  };

  const onDragEnd = async (result: DropResult) => {
    const { source, destination, draggableId } = result;
    if (!destination) return;

    const columnDestination = ChartOption.find((item) =>
      item.column.find(
        (columnItem) => columnItem.id === destination.droppableId
      )
    );
    const dataColumn = columnDestination?.column.find(
      (item) => item.id === destination.droppableId
    );

    const indexToUpdate = dataInherent?.findIndex(
      (item) => item.LINE_NO === draggableId
    );

    if (indexToUpdate !== undefined) {
      setDataInherent((prevData) => {
        if (prevData) {
          const newData = [...prevData];
          if (dataColumn) {
            newData[indexToUpdate] = {
              ...newData[indexToUpdate],
              PROBABILITAS_MITIGASI: dataColumn?.probabilitas,
              DAMPAK_MITIGASI: dataColumn?.dampak,
              NILAI_MITIGASI: dataColumn?.nilai,
            };
          }
          return newData;
        }
      });
      try {
        const data = new URLSearchParams();
        data.append('dampak_mitigasi', dataColumn?.dampak ?? '');
        data.append('prob_mitigasi', dataColumn?.probabilitas ?? '');
        data.append('level_of_risk_mitigasi', dataColumn?.nilai ?? '');
        data.append('line_no', draggableId);

        const response = await baseURL.put('/level_of_risk_mitigasi', data, {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        });
        notify('success');
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log(`Data dengan LINE_NO ${draggableId} tidak ditemukan.`);
    }
  };

  return (
    <>
      {modalDetail && <ModalDetail />}
      {isLoading && (
        <div className="w-screen h-screen fixed z-50 flex items-center justify-center cursor-progress">
          <LoadingSpinner />
        </div>
      )}
      <ToastContainer
        toastStyle={{
          borderRadius: '12px',
          width: '300px',
          fontSize: '16px',
          fontWeight: 500,
        }}
        className="w-full flex flex-col items-center mt-5 gap-2"
        transition={Flip}
      />
      <div className="w-full h-full flex flex-col items-center relative">
        <div className="flex gap-3 w-[98%] justify-between mt-3">
          <Image
            src={dpp}
            alt="logodpp"
            width={70}
            height={70}
            className="image-transparent"
          />
          <div className="flex flex-col items-center gap-0 pt-1">
            <h1 className="text-[32px] font-semibold">
              PETA RISIKO DP PERTAMINA
            </h1>
            {isPickYear ? (
              <div className="flex gap-2 items-center relative">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="Year"
                    openTo="year"
                    views={['year']}
                    value={selectedYear ? dayjs(selectedYear) : null}
                    onChange={handleYearChange}
                    className="w-[100px] h-[10px]"
                    slotProps={{ textField: { size: 'small' } }}
                    // ref={yearRef}
                  />
                </LocalizationProvider>
                <p
                  className="absolute top-2 -right-9 font-semibold rounded-full border-2 border-gray-500 text-gray-500 w-[24px] h-[24px] grid place-items-center cursor-pointer"
                  onClick={() => setIsPickYear(false)}
                >
                  X
                </p>
              </div>
            ) : (
              <h1
                className="text-[20px] font-semibold cursor-pointer"
                onClick={() => setIsPickYear(true)}
              >
                TAHUN <b className="underline">{year}</b>
              </h1>
            )}
          </div>
          <Image
            src={andal}
            alt="andal"
            width={70}
            height={70}
            className="image-transparent"
          />
        </div>
        <div className="w-[98%] border-b-2 border-gray-500 mb-4 flex gap-3 mt-2">
          <Link href={'/resiko'}>
            <button
              className={`${
                path === 'resiko' ? 'bg-gray-900' : 'bg-gray-400'
              } px-3 py-2 rounded-t-md text-white`}
            >
              Inherent
            </button>
          </Link>
          <Link href={'/mitigasi'}>
            <button
              className={`${
                path === 'mitigasi' ? 'bg-gray-900' : 'bg-gray-400'
              } px-3 py-2 rounded-t-md text-white`}
            >
              Setelah Mitigasi
            </button>
          </Link>
        </div>
        <div className="container-body w-[100vw]">
          <div className="chart-container relative">
            <h1 className="absolute rotate-[270deg] -left-12 top-1/2 -translate-y-1/2 text-[20px] border border-black py-1 px-6 opacity-30">
              Probabilitas
            </h1>
            <h1 className="absolute left-1/2 -bottom-8 text-[20px] border border-black py-1 px-12 opacity-30">
              Dampak
            </h1>
            <div>
              {ChartLabelProbabilitas.map((item, index) => (
                <div
                  className="  min-h-[80px] p-4 flex items-center justify-end  h-[14vh] relative text-[16px] font-semibold"
                  key={index}
                >
                  <div className="w-[12px] h-[1px] absolute top-0 right-0 bg-gray-500"></div>
                  <div className="w-[12px] h-[1px] absolute bottom-0 right-0 bg-gray-500"></div>
                  {item.label}
                </div>
              ))}
            </div>
            <DragDropContext onDragEnd={onDragEnd}>
              <ChartMitigasi
                isLegendHover={isLegendHover}
                dataInherent={dataInherent}
              />
            </DragDropContext>
          </div>
          <div className="flex flex-col gap-10 pl-4 pr-4">
            <div className="flex flex-col">
              <h1 className="text-[18px] font-semibold mb-2">Level Risiko:</h1>
              {LegendLevelResiko.map((item, index) => (
                <div
                  key={index}
                  className="flex gap-4 cursor-pointer hover:scale-[1.02] transition-all"
                  onClick={() =>
                    isLegendHover === item.legendValue
                      ? setIsLegendHover('')
                      : setIsLegendHover(item.legendValue)
                  }
                  style={{
                    transform:
                      isLegendHover === item.legendValue ? 'scale(1.02)' : '',
                    color: isLegendHover === item.legendValue ? '#3B82f6' : '',
                  }}
                >
                  <span
                    className={` grid place-items-center text-white text-[14px] w-[100px] py-1`}
                    style={colorBox(item.legendValue)}
                  >
                    {item.label}
                  </span>
                  <p className="text-[14px]">{item.text}</p>
                </div>
              ))}
            </div>
            <div className="flex flex-col gap-4">
              <h1 className="text-[18px] font-semibold">Daftar Fungsi:</h1>
              {dataDepartment?.map((item, index) => (
                <span
                  className={`flex gap-4 items-center ${
                    fungsiFilter
                      ? `text-gray-400 cursor-not-allowed`
                      : item.JUMLAH_REGISTER === '0'
                      ? 'text-gray-400 cursor-not-allowed'
                      : 'cursor-pointer hover:text-gray-600'
                  }  `}
                  key={index}
                  onClick={() => handleFilterClick(item)}
                  style={{
                    color: filterAktif.includes(item.KD_FUNGSI)
                      ? 'rgb(59 130 246)'
                      : '',
                  }}
                >
                  <button
                    className={`h-[30px] w-[30px] text-[11px] rounded-full text-white grid place-items-center box-shadow font-bold`}
                    style={{
                      background: fungsiFilter
                        ? filterAktif.includes(item.KD_FUNGSI)
                          ? colorCircle(item.KD_FUNGSI)
                          : 'rgb(156 163 175)'
                        : colorCircle(item.KD_FUNGSI),
                    }}
                  >
                    <p>{item.KD_FUNGSI}</p>
                  </button>
                  <p className="font-semibold">{item.NAMA_FUNGSI}</p>
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Mitigasi;
