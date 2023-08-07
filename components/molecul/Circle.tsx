import { ResikoInherentDTO } from '@/DTO/RiskDTO';
import React, { useState } from 'react';
import { useAppDispatch } from '@/hook/ReduxHook';
import { modalDetailTrue } from '@/redux/ViewConfiguration';
import { colorCircle } from '@/utils/ColorCircle';
import { Tooltip, Whisper } from 'rsuite';
import { baseURL } from '@/config/axios';
import { Draggable } from 'react-beautiful-dnd';

type dataRisk = {
  data: ResikoInherentDTO;
  index: number;
};

const Circle = ({ data, index }: dataRisk) => {
  const dispatch = useAppDispatch();
  const [showTooltip, setShowTooltip] = useState(false);

  const getItemStyle = (isDragging: boolean, draggableStyle: any) => {
    return {
      background: colorCircle(data.KD_FUNGSI),
      userSelect: 'none',
      ...draggableStyle,
    };
  };

  const handleClick = async () => {
    try {
      const response = await baseURL.get(
        `/detailResiko?line_no=${data.LINE_NO}`
      );
      dispatch(modalDetailTrue(response.data.data[0]));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Whisper
      followCursor
      speaker={
        <Tooltip>
          <div>
            <p>No. {data.ID_API}</p>
            <p>Line No. {data.LINE_NO}</p>
            <p>
              Pemilik Risiko. {data.KD_FUNGSI} - {data.NAMA_FUNGSI}
            </p>
            <p>Probabilitas: {data.PROBABILITAS_INHERENT}</p>
            <p>Dampak: {data.DAMPAK_INHERENT}</p>
            <p>Level of risk: {data.NILAI_INHERENT}</p>
          </div>
        </Tooltip>
      }
    >
      <div
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        className="h-[24px]"
      >
        <Draggable draggableId={data.LINE_NO} index={index}>
          {(provided, snapshot) => (
            <div
              className="h-[24px] w-[24px] text-[11px] rounded-full text-white grid place-items-center box-shadow font-bold hover:scale-150 transition-all"
              onClick={handleClick}
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              style={getItemStyle(
                snapshot.isDragging,
                provided.draggableProps.style
              )}
            >
              {index + 1}
            </div>
          )}
        </Draggable>
      </div>
    </Whisper>
  );
};

export default Circle;
