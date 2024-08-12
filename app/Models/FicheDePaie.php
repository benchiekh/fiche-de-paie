<?php

// app/Models/FicheDePaie.php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FicheDePaie extends Model
{
    use HasFactory;

    protected $fillable = [
        'mois', 'annee', 'salaireBrut', 'cotisations', 'netAPayer', 'employe_id'
    ];

    public function employe()
    {
        return $this->belongsTo(Employe::class);
    }

    public function salaireBrut()
    {
        return $this->hasOne(SalaireBrut::class);
    }

    public function cotisation()
    {
        return $this->hasOne(Cotisation::class);
    }

    public function net()
    {
        return $this->hasOne(Net::class);
    }
}