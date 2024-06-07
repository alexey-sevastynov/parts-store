import { COLORS } from '@/constants/colors';
import Styles from '@/styles/modules/dashboard/index.module.scss';
import { Controller } from 'react-hook-form';
import ReactQuill from 'react-quill';

const DescriptionInput = ({
  control,
  lang,
  label,
}: {
  control: any;
  lang: string;
  label: string;
}) => {
  const modules = {
    toolbar: [
      [{ color: [COLORS.red, COLORS.green, COLORS.orange] }],
      ['bold', 'underline'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['link'],
      ['clean'],
    ],
  };

  return (
    <div className={Styles.descriptionInput}>
      <label className={Styles.descriptionInput__label}>{label}</label>
      <Controller
        name={`description.${lang}`}
        control={control}
        render={({ field }) => (
          <ReactQuill modules={modules} theme='snow' {...field} />
        )}
      />
    </div>
  );
};

export default DescriptionInput;
