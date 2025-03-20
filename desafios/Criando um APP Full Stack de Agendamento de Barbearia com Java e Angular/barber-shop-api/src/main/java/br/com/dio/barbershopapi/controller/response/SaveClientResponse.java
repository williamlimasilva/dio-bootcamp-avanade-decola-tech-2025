package br.com.dio.barbershopapi.controller.response;

import com.fasterxml.jackson.annotation.JsonProperty;

public record SaveClientResponse(
        @JsonProperty("id")
        Long id,
        @JsonProperty("name")
        String name,
        @JsonProperty("email")
        String email,
        @JsonProperty("phone")
        String phone
) {
}
