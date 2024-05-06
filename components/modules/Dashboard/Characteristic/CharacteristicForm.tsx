import { createCharacteristic } from '@/actions/characteristicActions';
import { ICharacteristics } from '@/types/characteristic';
import { ChangeEvent, FormEvent, useState } from 'react';

interface CharacteristicFormState {
  nameEn: string;
  nameRu: string;
  nameUa: string;
  valueEn: string;
  valueRu: string;
  valueUa: string;
  values: { en: string; ru: string; ua: string }[];
}

export default function CharacteristicForm() {
  const [state, setState] = useState<CharacteristicFormState>({
    nameEn: '',
    nameRu: '',
    nameUa: '',
    valueEn: '',
    valueRu: '',
    valueUa: '',
    values: [],
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setState({
      ...state,
      [event.target.name]: event.target.value,
    });
  };

  const addValue = (): void => {
    if (state.valueEn && state.valueRu && state.valueUa) {
      setState({
        ...state,
        values: [
          ...state.values,
          {
            en: state.valueEn,
            ru: state.valueRu,
            ua: state.valueUa,
          },
        ],
        valueEn: '',
        valueRu: '',
        valueUa: '',
      });
    }
  };

  const handleEdit = (index: number): void => {
    // Implement edit functionality here
  };

  const handleDelete = (index: number): void => {
    const updatedValues = [...state.values];
    updatedValues.splice(index, 1);
    setState({ ...state, values: updatedValues });
  };

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();

    const characteristics: ICharacteristics = {
      name: {
        en: state.nameEn,
        ru: state.nameRu,
        ua: state.nameUa,
      },
      values: state.values, // Обновленное поле values
    };

    try {
      const response = await createCharacteristic(characteristics);
      console.log(response);
      // Очистка формы или другие действия при успешном создании характеристики
    } catch (error) {
      console.error(error);
      // Обработка ошибки при создании характеристики
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name (en):</label>
        <input
          type='text'
          name='nameEn'
          value={state.nameEn}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Name (ru):</label>
        <input
          type='text'
          name='nameRu'
          value={state.nameRu}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Name (ua):</label>
        <input
          type='text'
          name='nameUa'
          value={state.nameUa}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Values:</label>
        <div>
          <input
            type='text'
            value={state.valueEn}
            onChange={handleChange}
            name='valueEn'
          />
          <input
            type='text'
            value={state.valueRu}
            onChange={handleChange}
            name='valueRu'
          />
          <input
            type='text'
            value={state.valueUa}
            onChange={handleChange}
            name='valueUa'
          />
          <button type='button' onClick={addValue}>
            Add Value
          </button>
        </div>
        {state.values.map((value, index) => (
          <div key={index}>
            <span>{value.en}</span>
            <span>{value.ru}</span>
            <span>{value.ua}</span>
            <button type='button' onClick={() => handleEdit(index)}>
              Edit
            </button>
            <button type='button' onClick={() => handleDelete(index)}>
              Delete
            </button>
          </div>
        ))}
      </div>
      <button type='submit'>Submit</button>
    </form>
  );
}

// import { createCharacteristic } from '@/actions/characteristicActions';
// import { ICharacteristics } from '@/types/characteristic';
// import { ChangeEvent, FormEvent, useState } from 'react';

// interface CharacteristicFormState {
//   nameEn: string;
//   nameRu: string;
//   nameUa: string;
//   valueEn: string;
//   valueRu: string;
//   valueUa: string;
//   values: { en: string; ru: string; ua: string }[];
// }

// export default function CharacteristicForm() {
//   const [state, setState] = useState<CharacteristicFormState>({
//     nameEn: '',
//     nameRu: '',
//     nameUa: '',
//     valueEn: '',
//     valueRu: '',
//     valueUa: '',
//     values: [],
//   });

//   const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
//     setState({
//       ...state,
//       [event.target.name]: event.target.value,
//     });
//   };

//   const addValue = (): void => {
//     if (state.valueEn && state.valueRu && state.valueUa) {
//       setState({
//         ...state,
//         values: [
//           ...state.values,
//           {
//             en: state.valueEn,
//             ru: state.valueRu,
//             ua: state.valueUa,
//           },
//         ],
//         valueEn: '',
//         valueRu: '',
//         valueUa: '',
//       });
//     }
//   };

//   const handleSubmit = async (
//     event: FormEvent<HTMLFormElement>
//   ): Promise<void> => {
//     event.preventDefault();

//     const characteristics: ICharacteristics = {
//       name: {
//         en: state.nameEn,
//         ru: state.nameRu,
//         ua: state.nameUa,
//       },
//       values: state.values, // Обновленное поле values
//     };

//     try {
//       const response = await createCharacteristic(characteristics);
//       console.log(response);
//       // Очистка формы или другие действия при успешном создании характеристики
//     } catch (error) {
//       console.error(error);
//       // Обработка ошибки при создании характеристики
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <div>
//         <label>Name (en):</label>
//         <input
//           type='text'
//           name='nameEn'
//           value={state.nameEn}
//           onChange={handleChange}
//         />
//       </div>
//       <div>
//         <label>Name (ru):</label>
//         <input
//           type='text'
//           name='nameRu'
//           value={state.nameRu}
//           onChange={handleChange}
//         />
//       </div>
//       <div>
//         <label>Name (ua):</label>
//         <input
//           type='text'
//           name='nameUa'
//           value={state.nameUa}
//           onChange={handleChange}
//         />
//       </div>
//       <div>
//         <label>Values:</label>
//         <div>
//           <input
//             type='text'
//             value={state.valueEn}
//             onChange={handleChange}
//             name='valueEn'
//           />
//           <input
//             type='text'
//             value={state.valueRu}
//             onChange={handleChange}
//             name='valueRu'
//           />
//           <input
//             type='text'
//             value={state.valueUa}
//             onChange={handleChange}
//             name='valueUa'
//           />
//           <button type='button' onClick={addValue}>
//             Add Value
//           </button>
//         </div>
//         {state.values.map((value, index) => (
//           <div key={index}>
//             <span>{value.en}</span>
//             <span>{value.ru}</span>
//             <span>{value.ua}</span>
//           </div>
//         ))}
//       </div>
//       <button type='submit'>Submit</button>
//     </form>
//   );
// }
