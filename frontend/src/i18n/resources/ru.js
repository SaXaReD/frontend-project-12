import { Dropdown } from "react-bootstrap";

export default {
  translation: {
    messageCounter: {
      one_message: '{{ count }} сообщение',
      few_messages: '{{ count }} сообщения',
      many_messages: '{{ count }} сообщений',
    },
    login: {
      enter: 'Войти',
      enterLoading: 'Вход в систему',
      noAccount: 'Нет аккаунта?',
      registrateAccount : 'Зарегистрируйтесь',
      username: 'Ваш ник',
      password: 'Пароль',
    },
    404: {
      notFoundTitle: 'Страница не найдена :(',
      notFoundBody: 'Но вы можете перейти',
      notFoundLink: 'на главную страницу',
    },
    header: {
      title: 'Hexlet Chat',
      logout: 'Выйти',
    },
    channels: {
      title: 'Каналы',
      addChannel: 'Имя канала',
      remove: 'Удалить канал',
      rename: 'Переименовать канал',
      loading: 'Загрузка каналов...',
    },
    signup: {
      title: 'Регистрация',
      username: 'Ваш ник',
      password: 'Пароль',
      confirmPassword: 'Подтвердите пароль',
      registrationBtn: 'Зарегистрироваться',
      registrationLoading: 'Регистрация...',
    },
    messages: {
      placeholder: 'Введите сообщение...',
      send: 'Отправить',
      loading: 'Загрузка сообщений...',
    },
    error: {
      network: 'Ошибка сети, попробуйте позже',
      requiredField: 'Обязательное поле',
      login: 'Неверные имя пользователя или пароль',
      minLength: 'Минимум 6 символов',
      maxLength: 'Максимум 20 символов',
      minLengthUsername: 'минимум 3 символа',
      passwordsDontMatch: 'Пароли должны совпадать',
      usernameAlreadyExists: 'Такой пользователь уже существует',
      uniqueName: 'Должно быть уникальным',
      unknown: 'Неизвестная ошибка',
      channelAlreadyExists: 'Канал с таким именем уже существует',

    },
    dropdown: {
      rename: 'Переименовать',
      remove: 'Удалить',
    },
    modal: {
      removeChannel: {
        title: 'Удалить канал',
        body: 'Вы действительно хотите удалить этот канал?',
        confirmBtn: 'Удалить',
        cancelBtn: 'Отмена',
        loading: 'Удаление...',
      },
      renameChannel: {
        title: 'Переименовать канал',
        body: 'Имя канала',
        confirmBtn: 'Переименовать',
        loading: 'Переименование...',
        cancelBtn: 'Отмена',
      },
      createChannel: {
        title: 'Добавить канал',
        body: 'Имя канала',
        confirmBtn: 'Отправить',
        loading: 'Загрузка...',
        cancelBtn: 'Отмена',
      },
    }
  },
};