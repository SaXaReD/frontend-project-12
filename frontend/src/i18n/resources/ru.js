export default {
  translation: {
    messageCounter_one: '{{ count }} сообщение',
    messageCounter_few: '{{ count }} сообщения',
    messageCounter_many: '{{ count }} сообщений',
    login: {
      error: {
        invalidCredentials: 'Неверные имя пользователя или пароль',
      },
      enter: 'Войти',
      enterLoading: 'Вход в систему',
      noAccount: 'Нет аккаунта? ',
      registrateAccount: 'Регистрация',
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
      error: {
        alreadyExists: 'Канал с таким именем уже существует',
        profanity: 'Недопустимое имя канала',
      },
      title: 'Каналы',
      addChannel: 'Имя канала',
      remove: 'Удалить канал',
      rename: 'Переименовать канал',
      loading: 'Загрузка каналов...',
    },
    signup: {
      error: {
        profanity: 'Недопустимое имя пользователя',
        alreadyExists: 'Такой пользователь уже существует',
        dontMatch: 'Пароли должны совпадать',
      },
      title: 'Регистрация',
      username: 'Имя пользователя',
      password: 'Пароль',
      confirmPassword: 'Подтвердите пароль',
      registrationBtn: 'Зарегистрироваться',
      loading: 'Регистрация...',
    },
    messages: {
      error: {
        profanity: 'Сообщение содержит нецензурную лексику',
      },
      placeholder: 'Введите сообщение...',
      label: 'Новое сообщение',
      send: 'Отправить',
      loading: 'Загрузка сообщений...',
    },
    error: {
      requiredField: 'Обязательное поле',
      minLengthName: 'От 3 до 20 символов',
      minLengthPassword: 'Не менее 6 символов',
      uniqueName: 'Должно быть уникальным',
      profanity: 'Недопустимое название',
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
    },
    toast: {
      error: {
        network: 'Ошибка соединения',
      },
      success: {
        channelCreated: 'Канал создан',
        channelRemoved: 'Канал удалён',
        channelRenamed: 'Канал переименован',
      },
    },
  },
}
