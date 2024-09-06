package main.java.com.cafsena.domain;
import javax.persistence.*;
import java.sql.Timestamp;

@Entity
@Table(name = "Usuarios")
public class Usuario {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idUsuario;

    private String nombre;
    private String email;
    private String clave;
    private String telefono;
    private String direccion;
    private Timestamp fechaRegistro;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "idRol")
    private Rol rol;

    // Getters y Setters
}
