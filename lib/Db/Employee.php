<?php

declare(strict_types=1);

namespace OCA\WorkTime\Db;

use DateTime;
use JsonSerializable;
use OCP\AppFramework\Db\Entity;

/**
 * @method int getId()
 * @method void setId(int $id)
 * @method string getUserId()
 * @method void setUserId(string $userId)
 * @method string|null getPersonnelNumber()
 * @method void setPersonnelNumber(?string $personnelNumber)
 * @method string getFirstName()
 * @method void setFirstName(string $firstName)
 * @method string getLastName()
 * @method void setLastName(string $lastName)
 * @method string|null getEmail()
 * @method void setEmail(?string $email)
 * @method string getWeeklyHours()
 * @method void setWeeklyHours(string $weeklyHours)
 * @method int getVacationDays()
 * @method void setVacationDays(int $vacationDays)
 * @method int|null getSupervisorId()
 * @method void setSupervisorId(?int $supervisorId)
 * @method string getFederalState()
 * @method void setFederalState(string $federalState)
 * @method DateTime|null getEntryDate()
 * @method void setEntryDate(?DateTime $entryDate)
 * @method DateTime|null getExitDate()
 * @method void setExitDate(?DateTime $exitDate)
 * @method int getIsActive()
 * @method DateTime getCreatedAt()
 * @method void setCreatedAt(DateTime $createdAt)
 * @method DateTime getUpdatedAt()
 * @method void setUpdatedAt(DateTime $updatedAt)
 */
class Employee extends Entity implements JsonSerializable {

    public const FEDERAL_STATES = [
        'BW' => 'Baden-Württemberg',
        'BY' => 'Bayern',
        'BE' => 'Berlin',
        'BB' => 'Brandenburg',
        'HB' => 'Bremen',
        'HH' => 'Hamburg',
        'HE' => 'Hessen',
        'MV' => 'Mecklenburg-Vorpommern',
        'NI' => 'Niedersachsen',
        'NW' => 'Nordrhein-Westfalen',
        'RP' => 'Rheinland-Pfalz',
        'SL' => 'Saarland',
        'SN' => 'Sachsen',
        'ST' => 'Sachsen-Anhalt',
        'SH' => 'Schleswig-Holstein',
        'TH' => 'Thüringen',
    ];

    protected string $userId = '';
    protected ?string $personnelNumber = null;
    protected string $firstName = '';
    protected string $lastName = '';
    protected ?string $email = null;
    protected string $weeklyHours = '40.00';
    protected int $vacationDays = 30;
    protected ?int $supervisorId = null;
    protected string $federalState = 'BY';
    protected ?DateTime $entryDate = null;
    protected ?DateTime $exitDate = null;
    protected int $isActive = 1;
    protected ?DateTime $createdAt = null;
    protected ?DateTime $updatedAt = null;

    public function __construct() {
        $this->addType('id', 'integer');
        $this->addType('vacationDays', 'integer');
        $this->addType('supervisorId', 'integer');
        $this->addType('entryDate', 'datetime');
        $this->addType('exitDate', 'datetime');
        $this->addType('isActive', 'integer');
        $this->addType('createdAt', 'datetime');
        $this->addType('updatedAt', 'datetime');
    }

    public function setIsActive(bool|int $isActive): void {
        $value = is_bool($isActive) ? ($isActive ? 1 : 0) : $isActive;
        $this->isActive = $value;
        $this->markFieldUpdated('isActive');
    }

    public function getFullName(): string {
        return trim($this->firstName . ' ' . $this->lastName);
    }

    public function getDailyHours(): float {
        return (float)$this->weeklyHours / 5;
    }

    public function jsonSerialize(): array {
        return [
            'id' => $this->id,
            'userId' => $this->userId,
            'personnelNumber' => $this->personnelNumber,
            'firstName' => $this->firstName,
            'lastName' => $this->lastName,
            'fullName' => $this->getFullName(),
            'email' => $this->email,
            'weeklyHours' => (float)$this->weeklyHours,
            'vacationDays' => $this->vacationDays,
            'supervisorId' => $this->supervisorId,
            'federalState' => $this->federalState,
            'federalStateName' => self::FEDERAL_STATES[$this->federalState] ?? $this->federalState,
            'entryDate' => $this->entryDate?->format('Y-m-d'),
            'exitDate' => $this->exitDate?->format('Y-m-d'),
            'isActive' => (bool)$this->isActive,
            'createdAt' => $this->createdAt?->format('c'),
            'updatedAt' => $this->updatedAt?->format('c'),
        ];
    }
}
