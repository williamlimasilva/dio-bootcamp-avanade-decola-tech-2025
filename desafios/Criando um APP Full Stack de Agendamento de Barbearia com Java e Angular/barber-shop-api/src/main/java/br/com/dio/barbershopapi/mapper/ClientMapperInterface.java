package br.com.dio.barbershopapi.mapper;

import br.com.dio.barbershopapi.controller.request.SaveClientRequest;
import br.com.dio.barbershopapi.controller.request.UpdateClientRequest;
import br.com.dio.barbershopapi.controller.response.ClientDetailResponse;
import br.com.dio.barbershopapi.controller.response.ListClientResponse;
import br.com.dio.barbershopapi.controller.response.SaveClientResponse;
import br.com.dio.barbershopapi.controller.response.UpdateClientResponse;
import br.com.dio.barbershopapi.entity.ClientEntity;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

import static org.mapstruct.MappingConstants.ComponentModel.SPRING;

@Mapper(componentModel = SPRING)
public interface ClientMapperInterface {

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "schedules", ignore = true)
    ClientEntity toEntity(final SaveClientRequest request);

    SaveClientResponse toSaveResponse(final ClientEntity entity);

    @Mapping(target = "schedules", ignore = true)
    ClientEntity toEntity(final long id, final UpdateClientRequest request);

    UpdateClientResponse toUpdateResponse(final ClientEntity entity);

    ClientDetailResponse toDetailResponse(final ClientEntity entity);

    List<ListClientResponse> toListResponse(final List<ClientEntity> entities);

}
