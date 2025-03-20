package br.com.dio.barbershopapi.service.impl;

import br.com.dio.barbershopapi.entity.ScheduleEntity;
import br.com.dio.barbershopapi.repository.ScheduleRepositoryInterface;
import br.com.dio.barbershopapi.service.ScheduleServiceInterface;
import br.com.dio.barbershopapi.service.query.ScheduleQueryServiceInterface;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class ScheduleService implements ScheduleServiceInterface {

    private final ScheduleRepositoryInterface repository;
    private final ScheduleQueryServiceInterface queryService;

    @Override
    public ScheduleEntity save(final ScheduleEntity schedule) {
        queryService.verifyIfScheduleExists(schedule.getStartAt(), schedule.getEndAt());
        return repository.save(schedule);
    }

    @Override
    public void delete(Long id) {
        queryService.findById(id);
        repository.deleteById(id);

    }
}
