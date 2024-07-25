<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Employe extends Model
{
    use HasFactory;

    protected $fillable = [
        'CIN', 'CNS', 'nom', 'prenom', 'adresse', 'emploi', 'categorie', 'echelon', 'situationFamiliale', 'salaireDeBase', 'tauxHoraire', 'enfantsACharge', 'affiliationCNSS'
    ];

    public function ficheDePaies()
    {
        return $this->hasMany(FicheDePaie::class, 'employe_id');
    }
}
