package br.com.dio.barbershopapi.controller;

import br.com.dio.barbershopapi.controller.request.SaveClientRequest;
import br.com.dio.barbershopapi.controller.request.UpdateClientRequest;
import br.com.dio.barbershopapi.controller.response.ClientDetailResponse;
import br.com.dio.barbershopapi.controller.response.ListClientResponse;
import br.com.dio.barbershopapi.controller.response.SaveClientResponse;
import br.com.dio.barbershopapi.controller.response.UpdateClientResponse;
import br.com.dio.barbershopapi.entity.ClientEntity;
import br.com.dio.barbershopapi.mapper.ClientMapperInterface;
import br.com.dio.barbershopapi.service.ClientServiceInterface;
import br.com.dio.barbershopapi.service.query.ClientQueryServiceInterface;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static org.springframework.http.HttpStatus.*;

@RestController
@RequestMapping("clients")
@AllArgsConstructor
public class ClientController {
    private final ClientServiceInterface clientService;
    private final ClientQueryServiceInterface clientQueryService;
    private final ClientMapperInterface clientMapper;

    @PostMapping
    @ResponseStatus(CREATED)
    SaveClientResponse save(@RequestBody @Valid final SaveClientRequest request) {
        var client = clientMapper.toEntity(request);
        clientService.save(client);
        return clientMapper.toSaveResponse(client);
    }

    @PutMapping("{id}")
    @ResponseStatus(OK)
    UpdateClientResponse update(@PathVariable("id") final long id,@RequestBody @Valid final UpdateClientRequest request){
        ClientEntity client = clientMapper.toEntity(id, request);
        clientService.update(client);
        return clientMapper.toUpdateResponse(client);
    }

    @DeleteMapping("{id}")
    @ResponseStatus(NO_CONTENT)
    void delete(@PathVariable final long id){
        clientService.delete(id);
    }

    @GetMapping("{id}")
    @ResponseStatus(OK)
    ClientDetailResponse findById(@PathVariable final long id){
        ClientEntity client = clientQueryService.findById(id);
        return clientMapper.toDetailResponse(client);
    }

    @GetMapping
    @ResponseStatus(OK)
    List<ListClientResponse> list(){
        List<ClientEntity> clients = clientQueryService.list();
        return clientMapper.toListResponse(clients);
    }

}
