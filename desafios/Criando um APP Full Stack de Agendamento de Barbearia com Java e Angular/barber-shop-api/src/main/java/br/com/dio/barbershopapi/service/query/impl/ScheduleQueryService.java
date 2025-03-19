package br.com.dio.barbershopapi.service.query.impl;

import br.com.dio.barbershopapi.entity.ScheduleEntity;
import br.com.dio.barbershopapi.exception.NotFoundException;
import br.com.dio.barbershopapi.exception.ScheduleInUseException;
import br.com.dio.barbershopapi.repository.ScheduleRepositoryInterface;
import br.com.dio.barbershopapi.service.query.ScheduleQueryServiceInterface;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Repository;

import java.time.OffsetDateTime;
import java.util.List;

@Repository
@AllArgsConstructor
public class ScheduleQueryService implements ScheduleQueryServiceInterface {

    private ScheduleRepositoryInterface repository;
    @Override
    public ScheduleEntity findById(Long id) {
        return repository.findById(id).orElseThrow(() -> new NotFoundException("Schedule not found"));
    }

    @Override
    public List<ScheduleEntity> findInMonth(OffsetDateTime startAt, OffsetDateTime endAt) {
        return repository.findByStartAtGreaterThanEqualAndEndAtLessThanEqualOrderByStartAtAscEndAtAsc(startAt, endAt);
    }

    @Override
    public void verifyIfScheduleExists(OffsetDateTime startAt, OffsetDateTime endAt) {
        if(repository.existsByStartAtAndEndAt(startAt, endAt)){
            String message = String.format("Schedule already exists between %s and %s", startAt, endAt);
            throw new ScheduleInUseException(message);
        }

    }
}
