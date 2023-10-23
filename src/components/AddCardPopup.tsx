import React, { FormEvent, ReactElement } from 'react';
import PopupWithForm from './PopupWithForm';
import { useFormAndValidation } from '../hooks/useFormAndValidation';
import { IUpdateCardsValues } from '../types/cards';

interface IAddCardPopupProps {
  isOpen: boolean;
  onUpdateCards: (values: IUpdateCardsValues) => void;
  onClose: () => void;
}

function AddCardPopup({
  isOpen,
  onClose,
  onUpdateCards,
}: IAddCardPopupProps): ReactElement {
  React.useEffect(() => {
    resetForm();
  }, [isOpen]);

  const { values, handleChange, errors, isValid, resetForm } =
    useFormAndValidation<IUpdateCardsValues>({
      cardName: '',
      imageUrl: '',
    });

  function handleSubmit(evt: FormEvent<HTMLFormElement>) {
    evt.preventDefault();
    onUpdateCards(values);
  }

  return (
    <PopupWithForm
      title="Новое место"
      name="add-post"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText="Создать"
    >
      <input
        type="text"
        placeholder="Название места"
        name="cardName"
        className="popup__input"
        id="card-name-input"
        required
        minLength={2}
        maxLength={30}
        onChange={handleChange}
        value={values.cardName}
      />
      <span className="popup__input-error" id="card-name-input-error">
        {isValid ? '' : errors.cardName}
      </span>
      <input
        type="url"
        placeholder="Ссылка на картинку"
        name="imageUrl"
        className="popup__input"
        id="place-image-input"
        required
        onChange={handleChange}
        value={values.imageUrl}
      />
      <span className="popup__input-error" id="place-image-input-error">
        {isValid ? '' : errors.imageUrl}
      </span>
    </PopupWithForm>
  );
}

export default AddCardPopup;
