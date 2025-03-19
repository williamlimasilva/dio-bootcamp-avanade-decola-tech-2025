package br.com.dio.barbershopapi.service.query.impl;

import br.com.dio.barbershopapi.entity.ClientEntity;
import br.com.dio.barbershopapi.exception.EmailInUseException;
import br.com.dio.barbershopapi.exception.NotFoundException;
import br.com.dio.barbershopapi.exception.PhoneInUseException;
import br.com.dio.barbershopapi.repository.ClientRepositoryInterface;
import br.com.dio.barbershopapi.service.query.ClientQueryServiceInterface;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
@AllArgsConstructor
public class ClientQueryService implements ClientQueryServiceInterface {
    private ClientRepositoryInterface repository;

    @Override
    public ClientEntity findById(Long id) {
        return repository.findById(id).orElseThrow(() -> new NotFoundException("Client not found" + id));
    }

    @Override
    public List<ClientEntity> list() {
        return repository.findAll();
    }

    @Override
    public void verifyPhone(String phone) {
        if(repository.existsByPhone(phone)){
            String message = String.format("Phone %s already exists", phone);
            throw new PhoneInUseException(message);
        }
    }

    @Override
    public void verifyPhone(long id, String phone) {
        Optional<ClientEntity> optional = repository.findbyPhone(phone);
        if(optional.isPresent() && !Objects.equals(optional.get().getId(), id)){
            String message = String.format("Phone %s already exists", phone);
            throw new PhoneInUseException(message);
        }

    }

    @Override
    public void verifyEmail(String email) {
        if(repository.existsByEmail(email)){
            String message = String.format("Email %s already exists", email);
            throw new EmailInUseException(message);
        }

    }

    @Override
    public void verifyEmail(long id, String email) {
        Optional<ClientEntity> optional = repository.findByEmail(email);
        if(optional.isPresent() && !Objects.equals(optional.get().getId(), id)){
            String message = String.format("Email %s already exists", email);
            throw new EmailInUseException(message);
        }

    }
}
