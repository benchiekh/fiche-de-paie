<?php
// database/migrations/xxxx_xx_xx_xxxxxx_create_salaire_bruts_table.php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSalaireBrutsTable extends Migration
{
    public function up()
    {
        Schema::create('salaire_bruts', function (Blueprint $table) {
            $table->id();
            $table->foreignId('fiche_de_paie_id')->constrained('fiche_de_paies')->onDelete('cascade');
            $table->double('salaireHoraireBase');
            $table->double('salaireMensuelBase');
            $table->double('indemniteTransport');
            $table->double('indemniteTransport93');
            $table->double('indemniteLogement');
            $table->double('primePresenceHoraire');
            $table->double('primePresenceMensuelle');
            $table->double('primeTransportHoraire');
            $table->double('primeTransportMensuelle');
            $table->double('primeLogement');
            $table->double('primeExceptionnelle');
            $table->double('primePenibilite');
            $table->double('primeNuit');
            $table->double('primePanier');
            $table->double('primeProductivite');
            $table->double('heuresNuit');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('salaire_bruts');
    }
}
