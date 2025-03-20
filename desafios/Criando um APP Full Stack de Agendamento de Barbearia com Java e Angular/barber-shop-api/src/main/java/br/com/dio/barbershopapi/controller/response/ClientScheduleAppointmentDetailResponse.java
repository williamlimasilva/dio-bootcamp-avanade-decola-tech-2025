package br.com.dio.barbershopapi.controller.response;

import com.fasterxml.jackson.annotation.JsonProperty;

public record ClientScheduleAppointmentDetailResponse(
        @JsonProperty("id")
        Long id,
        @JsonProperty("name")
        String name,
        @JsonProperty("phone")
        String phone,
        @JsonProperty("email")
        String email
) {}
