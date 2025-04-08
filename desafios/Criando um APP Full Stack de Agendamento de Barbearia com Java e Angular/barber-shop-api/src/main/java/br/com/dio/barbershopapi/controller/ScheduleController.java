package br.com.dio.barbershopapi.controller;

import br.com.dio.barbershopapi.controller.request.SaveScheduleRequest;
import br.com.dio.barbershopapi.controller.response.SaveScheduleResponse;
import br.com.dio.barbershopapi.controller.response.ScheduleAppointmentMonthResponse;
import br.com.dio.barbershopapi.entity.ScheduleEntity;
import br.com.dio.barbershopapi.mapper.ScheduleMapperInterface;
import br.com.dio.barbershopapi.service.ScheduleServiceInterface;
import br.com.dio.barbershopapi.service.query.ScheduleQueryServiceInterface;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.time.OffsetDateTime;
import java.time.YearMonth;
import java.time.ZoneOffset;
import java.util.List;

import static org.springframework.http.HttpStatus.*;

@RestController
@RequestMapping("schedules")
@AllArgsConstructor
public class ScheduleController {
    private final ScheduleServiceInterface scheduleService;
    private final ScheduleQueryServiceInterface scheduleQueryService;
    private final ScheduleMapperInterface scheduleMapper;

    @PostMapping
    @ResponseStatus(CREATED)
    SaveScheduleResponse save(@RequestBody @Valid SaveScheduleRequest request) {
        ScheduleEntity schedule = scheduleMapper.toEntity(request);
        scheduleQueryService.verifyIfScheduleExists(schedule.getStartAt(), schedule.getEndAt());
        scheduleService.save(schedule);
        return scheduleMapper.toSaveResponse(schedule);
    }

    @DeleteMapping("{id}")
    @ResponseStatus(NO_CONTENT)
    void delete(@PathVariable long id) {
        scheduleService.delete(id);
    }

    @GetMapping("{year}/{month}")
    @ResponseStatus(OK)
    ScheduleAppointmentMonthResponse listMonth(@PathVariable final int year, final int month) {
        YearMonth yearMonth = YearMonth.of(year, month);
        OffsetDateTime startAt = yearMonth.atDay(1)
                .atTime(0, 0, 0, 0)
                .atOffset(ZoneOffset.UTC);
        OffsetDateTime endAt = yearMonth.atEndOfMonth()
                .atTime(23, 59, 59, 999999999)
                .atOffset(ZoneOffset.UTC);
        List<ScheduleEntity> schedules = scheduleQueryService.findInMonth(startAt, endAt);
        return scheduleMapper.toMonthResponse(year, month, schedules);
    }
}
