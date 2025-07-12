export default {
  translation: {
    messageCounter: {
      one_message: '{{ count }} сообщение',
      few_messages: '{{ count }} сообщения',
      many_messages: '{{ count }} сообщений',
    },
    login: {
      error: {
        invalidCredentials: 'Неверные имя пользователя или пароль',
      },
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
      error: {
        alreadyExists: 'Канал с таким именем уже существует',
      },
      title: 'Каналы',
      addChannel: 'Имя канала',
      remove: 'Удалить канал',
      rename: 'Переименовать канал',
      loading: 'Загрузка каналов...',
    },
    signup: {
      error: {
        alreadyExists: 'Такой пользователь уже существует',
        dontMatch: 'Пароли должны совпадать',
      },
      title: 'Регистрация',
      username: 'Ваш ник',
      password: 'Пароль',
      confirmPassword: 'Подтвердите пароль',
      registrationBtn: 'Зарегистрироваться',
      loading: 'Регистрация...',
    },
    messages: {
      placeholder: 'Введите сообщение...',
      send: 'Отправить',
      loading: 'Загрузка сообщений...',
    },
    error: {
      requiredField: 'Обязательное поле',
      minLengthName: 'Минимум 3 символа',
      minLengthPassword: 'Минимум 6 символов',
      maxLength: 'Максимум 20 символов',
      uniqueName: 'Должно быть уникальным',
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
        network: 'Произошла ошибка, повторите попытку позже',
      },
      success: {
        channelCreated: 'Канал создан',
        channelRemoved: 'Канал удален',
        channelRenamed: 'Канал переименован',
      },
    },
  },
};