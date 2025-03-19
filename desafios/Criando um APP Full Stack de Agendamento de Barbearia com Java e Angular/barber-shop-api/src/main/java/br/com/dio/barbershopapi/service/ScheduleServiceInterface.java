package br.com.dio.barbershopapi.service;

import br.com.dio.barbershopapi.entity.ScheduleEntity;

public interface ScheduleServiceInterface {

    ScheduleEntity save(final ScheduleEntity schedule);

    void delete(final Long id);
}
