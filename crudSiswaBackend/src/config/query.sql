create database if not exists ujk_siswa;
use ujk_siswa;


create table if not exists siswa (
id int unsigned primary key auto_increment,
kode_siswa varchar(10) unique,
nama varchar(50) not null,
alamat varchar(100),
tanggal_lahir date not null,
jurusan enum('sejarah','sastra','ekonomi')
);

alter table siswa add constraint uq_nama_tanggal_lahir unique (nama, tanggal_lahir);

delimiter //
create trigger tg_before_insert
before insert on siswa
for each row
begin
set new.nama = upper(new.nama);
end // delimiter ;

delimiter //
create trigger tg_before_update
before update on siswa
for each row
begin
set new.nama = upper(new.nama);
end // delimiter ;

delimiter //
create procedure tambah_siswa(
in p_kode_siswa varchar(10),
in p_nama varchar(50),
in p_alamat varchar(100),
in p_tanggal_lahir date,
in p_jurusan enum('sejarah','sastra','ekonomi')
)
begin 
insert into siswa(kode_siswa, nama, alamat, tanggal_lahir, jurusan) values (p_kode_siswa, p_nama, p_alamat, p_tanggal_lahir, p_jurusan);
end // delimiter ;