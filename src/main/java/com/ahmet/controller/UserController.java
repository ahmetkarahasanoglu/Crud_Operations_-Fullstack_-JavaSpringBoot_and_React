package com.ahmet.controller;

import com.ahmet.exception.UserNotFoundException;
import com.ahmet.repository.IUserRepository;
import com.ahmet.repository.entity.User;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
@CrossOrigin("http://localhost:5173")
public class UserController {

    private final IUserRepository repository;

    @PostMapping("/save")
    public User save(@RequestBody User newUser) {
        return repository.save(newUser); // returns the saved user
    }

    @GetMapping("/getAll")
    public List<User> getAll() {
        return repository.findAll();
    }

    @GetMapping("/{id}")
    public User getUserById(@PathVariable Long id) {
        return repository.findById(id)
                .orElseThrow(()->new UserNotFoundException(id));
    }

    @PutMapping("/{id}")
    User updateUser(@PathVariable Long id, @RequestBody User newUser) {
        return repository.findById(id)
                .map(user -> {
                    user.setUsername(newUser.getUsername());
                    user.setName(newUser.getName());
                    user.setEmail(newUser.getEmail());
                    return repository.save(user);
                }).orElseThrow(()->new UserNotFoundException(id));
    }

    @DeleteMapping("/{id}")
    String deleteUser(@PathVariable Long id) {
        if(!repository.existsById(id)) {
            throw new UserNotFoundException(id);
        }
        repository.deleteById(id);
        return "The user with the id "+id+" has been deleted.";
    }


}
