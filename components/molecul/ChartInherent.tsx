import React, { useEffect, useState } from 'react';
import { ChartOption } from '@/utils/ChartOptions';
import Circle from './Circle';
import { ChartOptionItem, ResikoInherentDTO } from '@/DTO/RiskDTO';
import { colorBox } from '@/utils/ColorCircle';
import { Droppable } from 'react-beautiful-dnd';

type ChartInherentType = {
  isLegendHover: string;
  dataInherent: ResikoInherentDTO[] | undefined;
};

const ChartInherent = ({ isLegendHover, dataInherent }: ChartInherentType) => {
  const [chartOptionData, setChartOptionData] = useState<ChartOptionItem[]>();

  useEffect(() => {
    setChartOptionData(ChartOption);
  }, []);

  console.log(dataInherent, 'cek dulu');

  return (
    <>
      {chartOptionData?.map((column, index) => (
        <div key={column.columnId}>
          {column.column.map((itemBox, index) => (
            <Droppable droppableId={`${itemBox.id}`} key={itemBox.id}>
              {(provided) => (
                <div
                  className={`${
                    isLegendHover.length > 0 && isLegendHover !== itemBox.legend
                      ? 'opacity-30'
                      : ''
                  }
                  h-[14vh] p-1 flex flex-wrap items-stretch justify-start relative text-[14px] gap-1 hover:opacity-80 transition-all`}
                  style={{
                    ...colorBox(itemBox.legend),
                    // alignContent: 'flex-start',
                  }}
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {isLegendHover.length > 0 &&
                  isLegendHover !== itemBox.legend ? (
                    ''
                  ) : (
                    <>
                      {dataInherent?.map((item, index) => (
                        <>
                          {item?.NILAI_INHERENT === itemBox.nilai &&
                          item?.DAMPAK_INHERENT === itemBox.dampak &&
                          item?.PROBABILITAS_INHERENT ===
                            itemBox.probabilitas ? (
                            <Circle data={item} key={index} index={index} />
                          ) : (
                            ''
                          )}
                        </>
                      ))}
                    </>
                  )}
                  <p className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 font-bold text-[20px] opacity-50 text-black z-50">
                    {itemBox.label}
                  </p>
                </div>
              )}
            </Droppable>
          ))}
          <div className="  p-4 pt-2 flex justify-center relative text-[16px] font-semibold">
            <div className="absolute w-[1px] h-[12px] top-0 left-0 bg-gray-500"></div>
            <div className="absolute w-[1px] h-[12px] top-0 right-0 bg-gray-500"></div>
            {column.dampak}
          </div>
        </div>
      ))}
    </>
  );
};

export default ChartInherent;
