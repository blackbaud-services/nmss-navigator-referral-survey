import find from 'lodash/find'
import filter from 'lodash/filter'

export const surveyMap = {
  '/referral-info': [
    {
      id: 409277,
      col: false,
      question: 'personIs'
    },
    {
      id: 409278,
      col: true,
      question: 'first'
    },
    {
      id: 409279,
      col: true,
      question: 'last'
    },
    {
      id: 409280,
      col: true,
      question: 'street'
    },
    {
      id: 409281,
      col: true,
      question: 'street2'
    },
    {
      id: 409282,
      col: true,
      question: 'city'
    },
    {
      id: 409283,
      col: true,
      question: 'state'
    },
    {
      id: 409284,
      col: true,
      question: 'zip'
    },
    {
      id: 409285,
      col: true,
      question: 'phone'
    },
    {
      id: 409286,
      col: false,
      question: 'email'
    },
    {
      id: 409287,
      col: true,
      question: 'gender'
    },
    {
      id: 409288,
      col: true,
      question: 'genderOther'
    },
    {
      id: 409371,
      col: false,
      question: 'isChild'
    },
    {
      id: 409349,
      col: false,
      question: 'childOther'
    },
    {
      id: 409289,
      col: false,
      question: 'reasons'
    },
    {
      id: 409290,
      col: false,
      question: 'otherReasons'
    }
  ],
  '/additional-info': [
    {
      id: 409291,
      col: false,
      question: 'providePatientInfo'
    },
    {
      id: 409292,
      col: false,
      question: 'additionalContact'
    }
  ],
  '/patient-info': [
    {
      id: 409294,
      col: false,
      question: 'relationship'
    },
    {
      id: 409295,
      col: true,
      question: 'first'
    },
    {
      id: 409296,
      col: true,
      question: 'last'
    },
    {
      id: 409297,
      col: true,
      question: 'street'
    },
    {
      id: 409298,
      col: true,
      question: 'street2'
    },
    {
      id: 409299,
      col: true,
      question: 'city'
    },
    {
      id: 409300,
      col: true,
      question: 'state'
    },
    {
      id: 409301,
      col: true,
      question: 'zip'
    },
    {
      id: 409302,
      col: true,
      question: 'phone'
    },
    {
      id: 409303,
      col: false,
      question: 'email'
    },
    {
      id: 409304,
      col: true,
      question: 'gender'
    },
    {
      id: 409305,
      col: true,
      question: 'genderOther'
    },
    {
      id: 409306,
      col: false,
      question: 'diagnosis'
    },
    {
      id: 409307,
      col: false,
      question: 'diagnosisOther'
    },
    {
      id: 409308,
      col: false,
      question: 'confirmation'
    },
    {
      id: 409309,
      col: false,
      question: 'apsReferral'
    },
    {
      id: 409310,
      col: false,
      question: 'additionalInfo'
    }
  ],
  '/additional-contact': [
    {
      id: 409312,
      col: false,
      question: 'pointOfContact'
    },
    {
      id: 409378,
      col: true,
      question: 'first'
    },
    {
      id: 409379,
      col: true,
      question: 'last'
    },
    {
      id: 409380,
      col: true,
      question: 'street'
    },
    {
      id: 409381,
      col: true,
      question: 'street2'
    },
    {
      id: 409382,
      col: true,
      question: 'city'
    },
    {
      id: 409318,
      col: true,
      question: 'state'
    },
    {
      id: 409383,
      col: true,
      question: 'zip'
    },
    {
      id: 409386,
      col: true,
      question: 'phone'
    },
    {
      id: 409303,
      col: false,
      question: 'email'
    },
    {
      id: 409322,
      col: true,
      question: 'gender'
    },
    {
      id: 409323,
      col: true,
      question: 'genderOther'
    }
  ],
  '/provider-info': [
    {
      id: 409325,
      col: true,
      question: 'org'
    },
    {
      id: 409326,
      col: true,
      question: 'role'
    },
    {
      id: 409327,
      col: true,
      question: 'first'
    },
    {
      id: 409328,
      col: true,
      question: 'last'
    },
    {
      id: 409329,
      col: true,
      question: 'phone'
    },
    {
      id: 409330,
      col: true,
      question: 'email'
    },
    {
      id: 409331,
      col: false,
      question: 'personallySubmit'
    },
    {
      id: 409332,
      col: false,
      question: 'noEmails'
    }
  ],
  '/preferences': [
    {
      id: 409334,
      col: true,
      question: 'language'
    },
    {
      id: 409335,
      col: true,
      question: 'contactMethod'
    },
    {
      id: 409336,
      col: false,
      question: 'callTime'
    },
    {
      id: 409337,
      col: false,
      question: 'challenges'
    },
    {
      id: 409376,
      col: false,
      question: 'indentify'
    },
    {
      id: 409377,
      col: false,
      question: 'leaveMessage'
    },
    {
      id: 409343,
      col: false,
      question: 'signature1'
    },
    {
      id: 409344,
      col: false,
      question: 'signature2Caption'
    },
    {
      id: 409345,
      col: false,
      question: 'signature2'
    }
  ]
}

export const findQuestion = (pathname, questionId) =>
  find(surveyMap[pathname], ({ id }) => id === Number(questionId))

export const findQuestionByText = (pathname, questionText) =>
  find(surveyMap[pathname], ({ question }) => question === questionText)

export const getPatientInfoSchema = () => filter(surveyMap['/patient-info'], i => {
  const filteredQuestions = ['relationship', 'additionalInfo', 'apsReferral', 'confirmation', 'diagnosisOther', 'diagnosis']
  if (filteredQuestions.indexOf(i.question) === -1) {
    return i
  }
})
