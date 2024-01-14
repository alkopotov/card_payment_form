import { useDispatch, useSelector } from 'react-redux';
import s from './CardForm.module.css'
import visaLogo from './images/logo_4.png'
import masterCardLogo from './images/logo_5.png'
import undefinedSystemLogo from './images/logo_0.png'
import { ReactComponent as SystemLogo } from './images/service_logo.svg';
import { useForm } from 'react-hook-form'
import { logoMasterCardAction, logoUndefinedAction, logoVisaAction } from '../../store/logoSlice';
import { ReactComponent as Slash } from './images/slash.svg';
import { addCardAction } from '../../store/tableSlice';


function CardForm() {

  const cardLogo =  {
    0: undefinedSystemLogo,
    4: visaLogo,
    5: masterCardLogo
  }

  const logo = useSelector((state) => state.logo.value)
  const dispatch = useDispatch()

  const checkCardDate = (year, month) => {
    let nextYear = +year < 2000 ? +year + 2000 : +year;
    if (+month === 12) nextYear++;
    let nextMonth = +month === 12 ? 1 : +month + 1;
    let lastDayOfMonth = Date.parse(`${nextYear}-${nextMonth}`) - 3_600_000
    return Date.now() < lastDayOfMonth
  } 

  const formatName = (name) => {
    let nameArray = name.trim().split(' ').filter(elem => elem !== '')
    return nameArray.map(elem => elem[0].toUpperCase() + elem.slice(1,).toLowerCase()).join(' ')
  } 
  const {
          register,
          reset,
          handleSubmit,
          formState: {errors}
        } = useForm({mode: 'onChange'});

  let inputCardNumber = register('cardnumber', {
    required: 'Required',
    minLength: {
      value: 16,
      message: '16 digits required'
    },
    maxLength: {
      value: 16,
      message: '16 digits required'
    },
    pattern: {
      value: /^[45]\d{15}$/,
      message: 'Invalid Card Number'
    }
  })

  let inputCardholder = register('cardholder', {
    required: 'Required',
    pattern: {
      value: /^[a-zA-Z]{2,}[ ]{1,}[a-zA-Z]{2,}$/,
      message: '2 words, letters only'
    }
  })

  let inputMonth = register('month', {
    required: 'Required',
    pattern: {
      value: /^\d{1,2}$/,
      message: '2 digits max'
    },
    validate: (value) => (+value > 0 && +value < 13) || 'Invalid'

  })

  let inputYear = register('year', {
    required: 'Required',
    pattern: {
      value: /^\d{1,2}$/,
      message: '2 digits max'
    },
    validate: (value, formValues) =>  {
      if (formValues.month) {
        return checkCardDate(value, formValues.month) || 'Expired' 
      } 
        return +Date.now().getFullYear() <= +`20${value}` || 'Invalid'
    }
  })

  let inputCvc = register('cvc', {
    required: 'Required',
    pattern: {
      value: /^\d{3}$/,
      message: 'Invalid'
    }
  })

  const checkCardType = (e) => {
    switch(+e.target.value[0]) {
      case 4:
        dispatch(logoVisaAction());
        break;
      case 5:
        dispatch(logoMasterCardAction());
        break;
      default:
        dispatch(logoUndefinedAction())
    }
  }

  const onSubmit = (data) => {
    console.log(data);
    let res = {...data, id: Date.now()}
    res.cardholder = formatName(data.cardholder)
    dispatch(addCardAction(res))
    dispatch(logoUndefinedAction())
    reset()
  }


  return (
    <section className={s.form_wrapper}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={s.card_system_logo}>
          <div className={s.card}>
            <div className={s.card_front_side}>

              <div className={s.cardholder_field}>
                <input className={s.cardholder_input} placeholder={'Card Holder'} {...inputCardholder} />
                {errors.cardholder && <p>{errors.cardholder.message}</p>}
              </div>

              <div className={s.card_number_field}>
                <input 
                      className={s.card_number_input} 
                      placeholder={'Card Number'} 
                      {...inputCardNumber} 
                      onChange={(e) => {
                        e.preventDefault()
                        checkCardType(e)}}
                />
                {errors.cardnumber && <p>{errors.cardnumber.message}</p>}
              </div>

              
              <p>VALID THRU</p>
              <div className={s.valid_thru_field}>
                <div className={s.valid_thru_wrapper}>
                  <input className={s.month_input} placeholder={'MM'} {...inputMonth}/>
                  {errors.month && <div className={s.month_error}>{errors.month.message}</div>}
                </div>

                <Slash/>

                <div className={s.valid_thru_wrapper}>
                  <input className={s.year_input} {...inputYear} placeholder={'YY'}/>
                  {errors.year && <div className={s.year_error}>{errors.year.message}</div>}
                </div>
                
              </div>
              <img src={cardLogo[logo]} alt='Card logo'/>          
            </div>
            <div className={s.card_back_side}>
              <div className={s.magnetic_stripe}></div>
              <div className={s.cvc_field}>
                <input type='password' className={s.cvc_input} {...inputCvc} placeholder={'CVC'} />
                {errors.cvc && <p>{errors.cvc.message}</p>}
              </div>
            </div>
          </div>
          <SystemLogo className={s.system_logo}/>
        </div>
        <input type="submit" value={'Send'} className={s.send_button}/>
      </form>
    </section>
    
  )
}

export default CardForm;
