import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { isToday, format, isAfter } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

import DayPicker, { DayModifiers } from 'react-day-picker';

import 'react-day-picker/lib/style.css';
import { FiPower, FiClock } from 'react-icons/fi';
import { parseISO } from 'date-fns/esm';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.svg';
import {
  Container,
  Header,
  HeaderContent,
  Profile,
  Content,
  Schedule,
  NextAppointment,
  Section,
  Appointment,
  Calendar,
} from './styles';
import { useAuth } from '../../hooks/Auth';
import api from '../../services/api';

interface MonthAvailabilityItem {
  day: number;
  avaliable: boolean;
}

interface Appointment {
  id: string;
  date: string;
  hourFormatted: string;
  user: {
    id: string;
    name: string;
    avatar_url: string;
  };
}

const Dashboard: React.FC = () => {
  const { signOut, user } = useAuth();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [monthAvailability, setMonthAvailability] = useState<
    MonthAvailabilityItem[]
  >([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  const handleDateChange = useCallback((day: Date, modifiers: DayModifiers) => {
    if (modifiers.available && !modifiers.disabled) {
      setSelectedDate(day);
    }
  }, []);

  const handleMonthChange = useCallback((month: Date) => {
    setCurrentMonth(month);
  }, []);

  useEffect(() => {
    async function loadAppointments(): Promise<void> {
      const response = await api.get<Appointment[]>('/appointments/@me', {
        params: {
          year: selectedDate.getFullYear(),
          month: selectedDate.getMonth() + 1,
          day: selectedDate.getDate(),
        },
      });
      const formattedAppointments = response.data.map(appointment => {
        return {
          ...appointment,
          hourFormatted: format(parseISO(appointment.date), 'HH:mm'),
        };
      });
      setAppointments(formattedAppointments);
    }
    loadAppointments();
  }, [selectedDate]);

  useEffect(() => {
    async function loadMonthAvailability(): Promise<void> {
      const response = await api.get(
        `/providers/${user.id}/availability/month`,
        {
          params: {
            year: currentMonth.getFullYear(),
            month: currentMonth.getMonth() + 1,
          },
        },
      );
      setMonthAvailability(response.data);
    }
    loadMonthAvailability();
  }, [currentMonth, user.id]);

  const disabledDays = useMemo(() => {
    const dates = monthAvailability
      .filter(monthDay => monthDay.avaliable === false)
      .map(monthDay => {
        const date = new Date(
          currentMonth.getFullYear(),
          currentMonth.getMonth(),
          monthDay.day,
        );

        return date;
      });

    return dates;
  }, [currentMonth, monthAvailability]);

  const selectedDateAsText = useMemo(() => {
    return format(selectedDate, "'Dia' dd 'de ' MMMM", {
      locale: ptBR,
    });
  }, [selectedDate]);

  const selectedWeekDayAsText = useMemo(() => {
    return format(selectedDate, 'cccc', {
      locale: ptBR,
    });
  }, [selectedDate]);

  const nextAppointment = useMemo(() => {
    return appointments.find(appointment =>
      isAfter(parseISO(appointment.date), new Date()),
    );
  }, [appointments]);

  const morningAppointments = useMemo(() => {
    return appointments.filter(
      appointment =>
        parseISO(appointment.date).getHours() < 12 &&
        !(appointment.id === nextAppointment?.id),
    );
  }, [appointments, nextAppointment]);

  const afternoonAppointments = useMemo(() => {
    return appointments.filter(
      appointment =>
        parseISO(appointment.date).getHours() >= 12 &&
        !(appointment.id === nextAppointment?.id),
    );
  }, [appointments, nextAppointment]);

  return (
    <Container>
      <Header>
        <HeaderContent>
          <img src={logo} alt="logo" />
          <Profile>
            <Link to="/profile">
              <img src={user.avatar_url} alt={user.name} />
              <div>
                <span>Bem vindo, </span>
                <strong>{user.name}</strong>
              </div>
            </Link>
          </Profile>
          <button type="button" onClick={signOut}>
            <FiPower />
          </button>
        </HeaderContent>
      </Header>
      <Content>
        <Schedule>
          <h1>Horários agendados</h1>
          <ul>
            {isToday(selectedDate) ? <li>Hoje |</li> : <li />}
            <li>{selectedDateAsText} |</li>
            <li>{selectedWeekDayAsText}</li>
          </ul>
          {nextAppointment && (
            <NextAppointment>
              <strong>Próximo Agendamento</strong>
              <div>
                <img
                  src={nextAppointment.user.avatar_url}
                  alt={nextAppointment.user.name}
                />
                <strong>{nextAppointment.user.name}</strong>
                <span>
                  <FiClock />
                  {nextAppointment.hourFormatted}
                </span>
              </div>
            </NextAppointment>
          )}
          <Section>
            <strong>Manhã</strong>
            {morningAppointments.length === 0 && (
              <h3>Por enquanto, nenhum agendamento nessa manhã. Aproveite!</h3>
            )}
            {morningAppointments.map(appointment => (
              <Appointment key={appointment.id}>
                <span>
                  <FiClock />
                  {appointment.hourFormatted}
                </span>
                <div>
                  <img
                    src={appointment.user.avatar_url}
                    alt={appointment.user.name}
                  />
                  <strong>{appointment.user.name}</strong>
                </div>
              </Appointment>
            ))}
          </Section>
          <Section>
            <strong>Tarde</strong>
            {afternoonAppointments.length === 0 && (
              <h3>Por enquanto, nenhum agendamento nessa tarde. Aproveite!</h3>
            )}
            {afternoonAppointments.map(appointment => (
              <Appointment key={appointment.id}>
                <span>
                  <FiClock />
                  {appointment.hourFormatted}
                </span>
                <div>
                  <img
                    src={appointment.user.avatar_url}
                    alt={appointment.user.name}
                  />
                  <strong>{appointment.user.name}</strong>
                </div>
              </Appointment>
            ))}
          </Section>
        </Schedule>
        <Calendar>
          <DayPicker
            weekdaysShort={['D', 'S', 'T', 'Q', 'Q', 'S', 'S']}
            fromMonth={new Date()}
            disabledDays={[{ daysOfWeek: [0, 6] }, ...disabledDays]}
            modifiers={{
              available: { daysOfWeek: [1, 2, 3, 4, 5] },
            }}
            selectedDays={selectedDate}
            onDayClick={handleDateChange}
            onMonthChange={handleMonthChange}
            months={[
              'Janeiro',
              'Fevereiro',
              'Março',
              'Abril',
              'Maio',
              'Junho',
              'Julho',
              'Agosto',
              'Setembro',
              'Outubro',
              'Novembro',
              'Dezembro',
            ]}
          />
        </Calendar>
      </Content>
    </Container>
  );
};

export default Dashboard;
