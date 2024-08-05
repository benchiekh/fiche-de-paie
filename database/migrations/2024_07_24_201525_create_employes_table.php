<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateEmployesTable extends Migration
{
    public function up()
    {
        Schema::create('employes', function (Blueprint $table) {
            $table->id();
            $table->integer('matricule')->unique();
            $table->string('CIN')->unique();
            $table->string('CNS')->unique();
            $table->string('nom');
            $table->string('prenom');
            $table->string('adresse');
            $table->string('emploi');
            $table->integer('categorie');
            $table->integer('echelon');
            $table->string('situationFamiliale');
            $table->double('salaireDeBase');
            $table->double('tauxHoraire');
            $table->integer('enfantsACharge');
            $table->string('affiliationCNSS');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('employes');
    }
}
